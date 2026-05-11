import { computed, ref, watchEffect } from "vue";
import i18n from "../i18n";

export type LangChoice = "en" | "system" | "fr";

const detect = (): "en" | "fr" => {
	if (typeof navigator === "undefined") return "en";
	return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
};

const stored = (typeof localStorage !== "undefined" && (localStorage.getItem("langChoice") as LangChoice)) || "system";
export const langChoice = ref<LangChoice>(stored);

export const effectiveLocale = computed<"en" | "fr">(() =>
	langChoice.value === "system" ? detect() : (langChoice.value as "en" | "fr"),
);

watchEffect(() => {
	i18n.global.locale.value = effectiveLocale.value;
	if (typeof document !== "undefined") {
		document.documentElement.lang = effectiveLocale.value;
		localStorage.setItem("langChoice", langChoice.value);
	}
});

export const setLang = (next: LangChoice) => {
	langChoice.value = next;
};
