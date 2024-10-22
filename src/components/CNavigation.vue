<template>
	<nav class="flex h-14 items-center max-lg:justify-around max-md:mt-10 md:mt-12 lg:justify-between">
		<a href="#">
			<img alt="Dorian's logo" class="hidden h-14 w-auto dark:block" src="../assets/logo_alpha.png" />
			<img alt="Dorian's logo" class="block h-14 w-auto dark:hidden" src="../assets/logo_alpha_dark.png" />
		</a>
		<ul class="flex gap-x-6 text-sm text-dark max-sm:hidden dark:text-light">
			<li><a v-smooth-scroll href="#about-me">About me</a></li>
			<li><a v-smooth-scroll href="#competencies">Competencies</a></li>
			<li><a v-smooth-scroll href="#projects">Projects</a></li>
		</ul>
	</nav>
</template>

<script lang="ts" setup></script>
<style scoped></style>
