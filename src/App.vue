<script lang="ts" setup>
import CSection from "./components/CSection.vue";
import CNavigation from "./components/CNavigation.vue";
import Intro from "./sections/Intro.vue";
import AboutMe from "./sections/AboutMe.vue";
import Competencies from "./sections/Competencies.vue";
import Projects from "./sections/Projects.vue";
import CThemeSwitcher from "./components/CThemeSwitcher.vue";
import Contact from "./sections/Contact.vue";

if (localStorage.getItem("theme") === null)
	localStorage.theme =
		!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
if (localStorage.theme === "dark") document.documentElement.classList.add("dark");
</script>
<template>
	<header>
		<CNavigation />
	</header>
	<main>
		<Intro class="mb-80 delay-[50ms] max-md:mt-10 md:mt-44" />
		<CSection id="about-me" :number="1" class="delay-100" title="About me">
			<AboutMe />
		</CSection>
		<CSection id="competencies" :number="2" class="delay-150" title="Competencies">
			<Competencies />
		</CSection>
		<CSection id="projects" :number="3" class="delay-200" title="Projects">
			<Projects />
		</CSection>
		<CSection id="contact" :number="4" class="delay-250" title="Contact">
			<Contact />
		</CSection>
	</main>
	<CThemeSwitcher class="fixed bottom-5 max-lg:right-5 max-sm:hidden lg:left-5" />
	<footer class="mb-5 border-t-4 border-t-light">
		<CNavigation class="delay-[250ms]" />
		<p class="text-center text-xs text-dark delay-300 max-sm:hidden dark:text-light">
			Handcrafted with <strong class="text-[red]">♥</strong> by <a href="#">Me</a><br />
			Designed by <a href="https://fiverr.com/nikolaieva_">Valeriia N</a>
		</p>
	</footer>
</template>

<style>
body {
	@apply bg-light transition-colors duration-500 max-lg:px-[3.125vw] lg:px-[12.5vw] dark:bg-dark;
}
</style>
