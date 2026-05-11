import { computed, ref, watchEffect } from "vue";
import { PAL } from "./palette";

export type ThemeChoice = "light" | "system" | "dark";

const stored =
	(typeof localStorage !== "undefined" && (localStorage.getItem("themeChoice") as ThemeChoice)) || "system";
export const themeChoice = ref<ThemeChoice>(stored);

const prefersDark = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
const systemDark = ref(prefersDark?.matches ?? false);
prefersDark?.addEventListener?.("change", (e) => (systemDark.value = e.matches));

export const isDark = computed(() =>
	themeChoice.value === "system" ? systemDark.value : themeChoice.value === "dark",
);

watchEffect(() => {
	if (typeof document === "undefined") return;
	document.documentElement.classList.toggle("dark", isDark.value);
	localStorage.setItem("themeChoice", themeChoice.value);
});

export const setTheme = (next: ThemeChoice) => {
	themeChoice.value = next;
};

export const themeTokens = computed(() => {
	const dark = isDark.value;
	return {
		bg: dark ? PAL.ink : PAL.cream,
		fg: dark ? PAL.cream : PAL.ink,
		panel: dark ? "rgba(243,242,243,0.04)" : "rgba(27,26,33,0.03)",
		panelHover: dark ? "rgba(199,167,99,0.10)" : "rgba(199,167,99,0.16)",
		panelHoverStrong: dark ? "rgba(199,167,99,0.12)" : "rgba(199,167,99,0.18)",
		border: dark ? "rgba(243,242,243,0.12)" : "rgba(27,26,33,0.12)",
		dim: dark ? "rgba(243,242,243,0.55)" : "rgba(27,26,33,0.5)",
		switchBg: dark ? "rgba(243,242,243,0.04)" : "rgba(27,26,33,0.04)",
		flagShadow: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)",
	};
});
