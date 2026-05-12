import { computed, ref, watchEffect } from "vue";

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
