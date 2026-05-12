import containerQueries from "@tailwindcss/container-queries";
import plugin from "tailwindcss/plugin";

// The official @tailwindcss/container-queries plugin (v0.1.1) only registers
// the `@` (min-width) variant. We add `@max-[Npx]:` for max-width container
// queries so layout overrides like `@max-[820px]:hidden` actually compile.
const containerMaxQueries = plugin(({ matchVariant }) => {
	matchVariant("@max", (value) => `@container (max-width: ${value})`);
});

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Solid palette — `<alpha-value>` placeholders make Tailwind's
				// `/N` opacity modifiers (e.g. `text-gold/70`) work everywhere.
				ink: "rgb(27 26 33 / <alpha-value>)",
				cream: "rgb(243 242 243 / <alpha-value>)",
				gold: "rgb(199 167 99 / <alpha-value>)",
				amber: "rgb(205 139 0 / <alpha-value>)",
				"gray-mid": "rgb(92 91 96 / <alpha-value>)",
				"gray-dim": "rgb(144 144 144 / <alpha-value>)",
				tag: {
					daily: "rgb(82 168 96 / <alpha-value>)",
					shipped: "rgb(199 167 99 / <alpha-value>)",
					touched: "rgb(140 140 150 / <alpha-value>)",
					learning: "rgb(118 152 209 / <alpha-value>)",
				},
				// Theme-reactive semantic tokens. bg/fg are bare RGB triplets so
				// alpha modifiers compose; dim is a semi-transparent fg shortcut.
				bg: "rgb(var(--c-bg) / <alpha-value>)",
				fg: "rgb(var(--c-fg) / <alpha-value>)",
				dim: "rgb(var(--c-fg) / 0.5)",
				panel: "var(--c-panel)",
				"panel-hover": "var(--c-panel-hover)",
				"panel-hover-strong": "var(--c-panel-hover-strong)",
				border: "var(--c-border)",
				"switch-bg": "var(--c-switch-bg)",
				"flag-shadow": "var(--c-flag-shadow)",
				// Error red used by form / vim modal
				err: "rgb(224 35 78 / <alpha-value>)",
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				mono: [
					"ui-monospace",
					'"SF Mono"',
					"Menlo",
					'"Cascadia Code"',
					"Consolas",
					"monospace",
				],
			},
		},
	},
	plugins: [containerQueries, containerMaxQueries],
};
