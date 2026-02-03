/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{njk,md,html,js}"],
    theme: {
        extend: {
            colors: {
                bg: {
                    ivory: '#FDFBF7',
                    dark: '#111111',
                },
                text: {
                    charcoal: '#1A1A1A',
                    light: '#666666',
                    inverse: '#FFFFFF',
                },
                accent: {
                    blue: '#2358A6',
                },
                border: {
                    subtle: '#EBEAE5',
                },
                status: {
                    success: '#2E7D32',
                    error: '#C62828',
                }
            },
            fontFamily: {
                serif: ['"Crimson Pro"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            scale: {
                '101': '1.01',
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        fontFamily: theme('fontFamily.serif'),
                        color: theme('colors.text.charcoal'),
                        h1: {
                            fontFamily: theme('fontFamily.serif'),
                            color: theme('colors.text.charcoal'),
                        },
                        h2: {
                            fontFamily: theme('fontFamily.serif'),
                            marginTop: '2em',
                            marginBottom: '0.8em',
                        },
                        h3: {
                            fontFamily: theme('fontFamily.serif'),
                        },
                        strong: {
                            color: theme('colors.text.charcoal'),
                            fontWeight: '600',
                        },
                        a: {
                            color: theme('colors.text.charcoal'),
                            textDecoration: 'underline',
                            textUnderlineOffset: '3px',
                            '&:hover': {
                                color: theme('colors.accent.blue'),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
