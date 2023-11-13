/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{jsx,tsx,ts,js}, ./components/**/*.{jsx,tsx,ts,js}"],
    theme: {
        extend: {
            fontFamily: {
                ink: ["InkFree"],
            },
        },
    },
    // plugins: [],
}
