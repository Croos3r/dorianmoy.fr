/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1600px",
		},
		colors: {
			dark: "#1b1a21",
			light: "#f5f5f5",
			primary: "#c7a763",
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
		fontSize: {
			xs: [".875rem"],
			sm: ["1.125rem"],
		},
		extend: {},
	},
	plugins: [],
};
