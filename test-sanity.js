require('dotenv').config({ path: 'frontend/.env' });
const { createClient } = require('@sanity/client');
const groq = require('groq');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function testFetch() {
    console.log('Project ID:', process.env.SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.SANITY_DATASET);

    try {
        const essays = await client.fetch(groq`*[_type == "essay"] | order(date desc)`);
        console.log(`Found ${essays.length} essays.`);
        if (essays.length > 0) {
            console.log('Sample essay:', essays[0].title);
        } else {
            console.log('No essays found. Check your Sanity Studio content.');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

testFetch();
