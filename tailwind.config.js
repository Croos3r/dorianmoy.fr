/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		colors: {
			dark: "#1b1a21",
			light: "#f5f5f5",
			primary: "#c7a763",
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
		fontSize: {
			xs: [
				".875rem",
				{
					lineHeight: "0.35rem",
				},
			],
			sm: [
				"1.125rem",
				{
					lineHeight: "0.45rem",
				},
			],
		},
		extend: {},
	},
	plugins: [],
};
