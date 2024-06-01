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
	<footer class="border-t-light mb-5 border-t-4">
		<CNavigation />
		<p class="dark:text-light text-dark text-center text-xs">
			Développé avec <strong class="text-[red]">♥</strong> par <a href="#">moi-même</a><br />
			Design par <a href="https://fiverr.com/nikolaieva_">Valeriia N</a>
		</p>
	</footer>
</template>

<style>
body {
	@apply dark:bg-dark bg-light max-lg:px-[3.125vw] lg:px-[12.5vw];
}
</style>
