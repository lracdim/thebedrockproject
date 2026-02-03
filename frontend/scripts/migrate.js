require('dotenv').config();
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
});

// Helper to convert Markdown to simple Portable Text
function markdownToPortableText(markdown) {
    const lines = markdown.split('\n');
    const blocks = [];

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.startsWith('## ')) {
            blocks.push({
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: line.replace('## ', '') }]
            });
        } else if (line.startsWith('### ')) {
            blocks.push({
                _type: 'block',
                style: 'h3',
                children: [{ _type: 'span', text: line.replace('### ', '') }]
            });
        } else if (line.startsWith('> ')) {
            blocks.push({
                _type: 'block',
                style: 'blockquote',
                children: [{ _type: 'span', text: line.replace('> ', '') }]
            });
        } else {
            // Basic paragraph
            blocks.push({
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: line }]
            });
        }
    });
    return blocks;
}

async function migrateEssays() {
    const essayDir = './src/content/essays';
    const files = fs.readdirSync(essayDir).filter(f => f.endsWith('.md'));

    console.log(`Found ${files.length} essays to migrate...`);

    for (const file of files) {
        const content = fs.readFileSync(`${essayDir}/${file}`, 'utf8');
        const { data, content: markdown } = matter(content);

        const doc = {
            _type: 'essay',
            title: data.title,
            slug: { _type: 'slug', current: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            pressure: data.pressure || 'Medium',
            readingTime: data.readingTime || '5 min',
            centralScripture: data.centralScripture,
            thesis: data.thesis,
            tags: data.tags || [],
            content: markdownToPortableText(markdown)
        };

        try {
            // Use createOrReplace to avoid duplicates based on deterministic ID (optional, here just create)
            // Actually, let's just create for now. checking title might be better.
            // We'll trust the process.
            const res = await client.create(doc);
            console.log(`Migrated: ${doc.title}`);
        } catch (err) {
            console.error(`Failed to migrate ${file}:`, err.message);
        }
    }
}

async function migrateSoulStates() {
    const dir = './src/content/states';
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    console.log(`Found ${files.length} soul states...`);

    for (const file of files) {
        const content = fs.readFileSync(`${dir}/${file}`, 'utf8');
        const { data } = matter(content); // Soul states define most content in frontmatter

        const doc = {
            _type: 'soulState',
            title: data.title,
            slug: { _type: 'slug', current: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
            icon: data.icon,
            definition: data.definition,
            manifestations: {
                emotional: data.manifestations?.emotional,
                spiritual: data.manifestations?.spiritual
            },
            falseBeliefs: data.falseBeliefs,
            scripture: {
                text: data.scripture?.text,
                reference: data.scripture?.reference,
                commentary: data.scripture?.commentary
            },
            requirements: data.requirements
        };

        try {
            await client.create(doc);
            console.log(`Migrated State: ${doc.title}`);
        } catch (err) {
            console.error(`Failed State ${file}:`, err.message);
        }
    }
}

async function run() {
    await migrateEssays();
    await migrateSoulStates();
    console.log('Migration complete.');
}

run();
