<script lang="ts" setup>
import CButton from "../components/CButton.vue";
</script>

<template>
	<section class="max-sm:text-center">
		<div class="flex flex-col gap-y-2.5 text-dark dark:text-light">
			<p>Hi, my name is</p>
			<h1 class="max-sm:leading-none">Dorian Moy</h1>
			<p class="max-sm:text-sm md:leading-8">
				Junior French Fullstack Developer<br />
				Proficient with TypeScript-based stacks<br />
				Web3 and Cybersecurity enthusiast
			</p>
		</div>
		<div class="mt-16 flex gap-8 max-lg:flex-col">
			<a href="mailto://contact@dorianmoy.fr">
				<CButton title="Get in touch" variant="line" />
			</a>
			<a href="/resume_dorian_moy.pdf" target="_blank">
				<CButton title="View my Resumé" variant="fill" />
			</a>
		</div>
	</section>
</template>

<style scoped></style>
