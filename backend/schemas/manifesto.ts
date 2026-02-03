export default {
    name: 'manifesto',
    title: 'Manifesto',
    type: 'document',
    fields: [
        {
            name: 'openingDeclaration',
            title: 'Opening Declaration',
            type: 'text',
        },
        {
            name: 'affirmations',
            title: 'What We Affirm',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'rejections',
            title: 'What We Reject',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'theCost',
            title: 'The Cost',
            type: 'text',
        },
    ],
}
