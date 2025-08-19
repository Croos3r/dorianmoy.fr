<template>
	<button
		:title="$t('language.switch')"
		class="fixed bottom-5 z-50 flex items-center justify-center overflow-hidden rounded-full bg-primary shadow-xl transition-all hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80 h-[5rem] w-[5rem] max-lg:right-28 lg:left-28 max-sm:h-[4rem] max-sm:w-[4rem] max-sm:left-5"
		@click="toggleLanguage"
	>
		<span class="font-bold text-light text-[1.75rem] max-sm:text-[1.25rem]">{{ currentLanguage === "en" ? "EN" : "FR" }}</span>
	</button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLanguage = computed(() => locale.value);

const toggleLanguage = () => {
	locale.value = locale.value === "en" ? "fr" : "en";
	localStorage.setItem("language", locale.value);
};

if (localStorage.getItem("language")) {
	locale.value = localStorage.getItem("language") || "en";
}
</script>

<style scoped></style>
