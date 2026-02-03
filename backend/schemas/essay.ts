export default {
    name: 'essay',
    title: 'Essay',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
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
            name: 'date',
            title: 'Publication Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
        {
            name: 'pressure',
            title: 'Pressure Level',
            type: 'string',
            options: {
                list: [
                    { title: 'High', value: 'High' },
                    { title: 'Medium', value: 'Medium' },
                    { title: 'Low', value: 'Low' },
                ],
            },
        },
        {
            name: 'readingTime',
            title: 'Reading Time',
            type: 'string',
            description: 'e.g., "5 min"',
        },
        {
            name: 'centralScripture',
            title: 'Central Scripture',
            type: 'string',
        },
        {
            name: 'thesis',
            title: 'Thesis Statement',
            type: 'text',
            rows: 3,
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },
    ],
}
