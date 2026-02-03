require('dotenv').config();
const { createClient } = require('@sanity/client');
const groq = require('groq');

const client = process.env.SANITY_PROJECT_ID
    ? createClient({
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        apiVersion: '2024-01-01',
        useCdn: false, // Ensure fresh data for build
    })
    : null;

module.exports = async function () {
    if (!client) {
        console.warn('⚠️  SANITY_PROJECT_ID is missing. Using fallback (empty data).');
        return {
            essays: [],
            states: [],
            manifesto: null
        };
    }

    console.log('✅ SANITY_PROJECT_ID found. Fetching data from Sanity...');
    const essays = await client.fetch(groq`*[_type == "essay"] | order(date desc)`);
    console.log(`✅ Fetched ${essays.length} essays.`);

    const states = await client.fetch(groq`*[_type == "soulState"]`);
    const manifesto = await client.fetch(groq`*[_type == "manifesto"][0]`);

    return {
        essays,
        states,
        manifesto
    };
};
