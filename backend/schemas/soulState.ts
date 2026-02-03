export default {
    name: 'soulState',
    title: 'Soul State',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'State Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Waves', value: 'waves' },
                    { title: 'Cloud', value: 'cloud' },
                    { title: 'Battery', value: 'battery' },
                    { title: 'U-Turn', value: 'u-turn' },
                ],
            },
        },
        {
            name: 'definition',
            title: 'Definition',
            type: 'text',
            rows: 3,
        },
        {
            name: 'manifestations',
            title: 'Manifestations',
            type: 'object',
            fields: [
                { name: 'emotional', type: 'text', rows: 2 },
                { name: 'spiritual', type: 'text', rows: 2 },
            ],
        },
        {
            name: 'falseBeliefs',
            title: 'False Beliefs',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'scripture',
            title: 'Key Scripture',
            type: 'object',
            fields: [
                { name: 'text', title: 'Verse Text', type: 'text' },
                { name: 'reference', title: 'Reference', type: 'string' },
                { name: 'commentary', title: 'Commentary', type: 'text' },
            ],
        },
        {
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{ type: 'string' }],
        },
    ],
}
