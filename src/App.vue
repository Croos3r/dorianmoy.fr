<script lang="ts" setup>
import CSection from "./components/CSection.vue";
import CNavigation from "./components/CNavigation.vue";
import Intro from "./sections/Intro.vue";
import AboutMe from "./sections/AboutMe.vue";
import Competencies from "./sections/Competencies.vue";
import Projects from "./sections/Projects.vue";
</script>
<template>
	<header>
		<CNavigation />
	</header>
	<main>
		<Intro class="mb-80 mt-44" />
		<CSection id="about-me" :number="1" title="About me">
			<AboutMe />
		</CSection>
		<CSection id="competencies" :number="2" title="Competencies">
			<Competencies />
		</CSection>
		<CSection id="projects" :number="3" title="Projects">
			<Projects />
		</CSection>
	</main>
	<footer class="mb-5 border-t-4 border-t-light">
		<CNavigation />
		<p class="text-center text-xs text-dark dark:text-light">
			Developed with <strong class="text-[red]">♥</strong> by <a href="#">Me</a><br />
			Designed by <a href="https://fiverr.com/nikolaieva_">Valeriia N</a>
		</p>
	</footer>
</template>

<style>
body {
	@apply bg-light max-lg:px-[3.125vw] lg:px-[12.5vw] dark:bg-dark;
}
</style>
