<script lang="ts" setup>
import CSection from "./components/CSection.vue";
import CNavigation from "./components/CNavigation.vue";
</script>
<template>
	<header>
		<CNavigation />
	</header>
	<main>
		<CSection id="about-me" :number="1" title="About me" />
		<CSection id="competencies" :number="2" title="Competencies" />
		<CSection id="projects" :number="3" title="Projects" />
		<CSection id="contact" :number="4" title="Contact" />
	</main>
	<footer class="mb-5 border-t-4 border-t-light">
		<CNavigation />
		<p class="text-center text-xs text-dark dark:text-light">
			Implemented with <strong class="text-[red]">♥</strong> by <a href="#">Me</a><br />
			Design by <a href="https://fiverr.com/nikolaieva_">Valeriia N</a>
		</p>
	</footer>
</template>

<style>
body {
	@apply bg-light max-lg:px-[3.125vw] lg:px-[12.5vw] dark:bg-dark;
}
</style>
