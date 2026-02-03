require('dotenv').config();
const { createClient } = require('@sanity/client');
const groq = require('groq');
const fs = require('fs');
const path = require('path');

// Determine log file path (relative to project root)
const logFile = path.resolve(__dirname, '../../debug-sanity.log');

const log = (msg) => {
    try {
        fs.appendFileSync(logFile, new Date().toISOString() + ': ' + msg + '\n');
    } catch (e) {
        console.error('Log error:', e);
    }
};

log('--- NEW BUILD START ---');
log('Sanity data file executing...');
log('Env Project ID: ' + (process.env.SANITY_PROJECT_ID ? process.env.SANITY_PROJECT_ID : 'UNDEFINED'));

const client = process.env.SANITY_PROJECT_ID
    ? createClient({
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        apiVersion: '2024-01-01',
        useCdn: false, // Ensure fresh data for build
        token: process.env.SANITY_TOKEN // Add token (optional, for private datasets)
    })
    : null;

module.exports = async function () {
    if (!client) {
        log('WARNING: client is null. Fallback used.');
        console.warn('⚠️  SANITY_PROJECT_ID is missing. Using fallback (empty data).');
        return {
            essays: [],
            states: [],
            manifesto: null
        };
    }

    log('Client initialized. Fetching essays...');
    console.log('✅ SANITY_PROJECT_ID found. Fetching data from Sanity...');

    try {
        const essays = await client.fetch(groq`*[_type == "essay"] | order(date desc)`);
        log(`Fetched ${essays.length} essays.`);
        console.log(`✅ Fetched ${essays.length} essays.`);

        const states = await client.fetch(groq`*[_type == "soulState"]`);
        const manifesto = await client.fetch(groq`*[_type == "manifesto"][0]`);

        log('All fetches complete.');
        return {
            essays,
            states,
            manifesto
        };
    } catch (err) {
        log('ERROR fetching data: ' + err.message);
        console.error('Wait, error fetching data:', err);
        throw err;
    }
};
