require('dotenv').config();
const { createClient } = require('@sanity/client');
const groq = require('groq');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false, // Ensure fresh data for build
});

module.exports = async function () {
    const essays = await client.fetch(groq`*[_type == "essay"] | order(date desc)`);
    const states = await client.fetch(groq`*[_type == "soulState"]`);
    const manifesto = await client.fetch(groq`*[_type == "manifesto"][0]`);

    return {
        essays,
        states,
        manifesto
    };
};
