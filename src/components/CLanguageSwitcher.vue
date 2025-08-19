<template>
	<button
		:title="$t('language.switch')"
		class="fixed bottom-5 z-50 flex h-[5rem] w-[5rem] items-center justify-center overflow-hidden rounded-full bg-primary shadow-xl transition-all hover:bg-primary/80 max-lg:right-28 max-sm:hidden lg:left-28 dark:bg-primary dark:hover:bg-primary/80"
		@click="toggleLanguage"
	>
		<span class="text-[1.75rem] font-bold text-light">{{ currentLanguage === "en" ? "EN" : "FR" }}</span>
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
