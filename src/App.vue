<script lang="ts" setup>
import CSection from "./components/CSection.vue";
import CNavigation from "./components/CNavigation.vue";
import Intro from "./sections/Intro.vue";
import AboutMe from "./sections/AboutMe.vue";
import Competencies from "./sections/Competencies.vue";
import Projects from "./sections/Projects.vue";
import CThemeSwitcher from "./components/CThemeSwitcher.vue";
import CLanguageSwitcher from "./components/CLanguageSwitcher.vue";

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
		<CSection id="about-me" :number="1" class="delay-100" :title="$t('sections.aboutMe')">
			<AboutMe />
		</CSection>
		<CSection id="competencies" :number="2" class="delay-150" :title="$t('sections.competencies')">
			<Competencies />
		</CSection>
		<CSection id="projects" :number="3" class="delay-200" :title="$t('sections.projects')">
			<Projects />
		</CSection>
	</main>
	<CThemeSwitcher class="fixed bottom-5 max-lg:right-5 lg:left-5 max-sm:right-5" />
	<CLanguageSwitcher />
	<footer class="mb-5 border-t-4 border-t-dark delay-[250ms] dark:border-t-light">
		<CNavigation />
		<p class="text-center text-xs text-dark delay-300 max-sm:hidden dark:text-light">
			<!-- eslint-disable-next-line vue/no-v-html -->
			<span v-html="$t('footer.handcrafted')"></span><br />
			<!-- eslint-disable-next-line vue/no-v-html -->
			<span v-html="$t('footer.designed')"></span>
		</p>
	</footer>
</template>

<style></style>
