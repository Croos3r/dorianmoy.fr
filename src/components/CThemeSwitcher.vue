<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";

const theme = ref<"dark" | "light">(localStorage.theme ?? "light");

function toggleTheme() {
	theme.value = localStorage.theme = theme.value === "dark" ? "light" : "dark";
	document.documentElement.classList.toggle("dark");
}
</script>

<template>
	<div
		:class="theme === 'dark' ? 'bg-primary text-light hover:text-dark' : 'bg-dark text-primary hover:text-light'"
		class="fixed bottom-5 left-5 h-[5rem] w-[5rem] cursor-pointer rounded-full text-center text-[3rem] leading-[5rem] hover:duration-100"
		@click="toggleTheme"
	>
		<FontAwesomeIcon :icon="theme === 'dark' ? faMoon : faSun" class="transition-all" />
	</div>
</template>

<style scoped></style>
