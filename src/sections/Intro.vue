<script lang="ts" setup>
import CButton from "../components/CButton.vue";
</script>

<template>
	<div>
		<div class="flex flex-col gap-y-2.5 text-dark dark:text-light">
			<p>Hi, my name is</p>
			<h1>Dorian Moy</h1>
			<p class="leading-8">
				Junior French Fullstack Developer living in Korea<br />
				Proficient in TypeScript-based stacks<br />
				Web3 and Cybersecurity enthusiast
			</p>
		</div>
		<a href="mailto://contact@dorianmoy.fr">
			<CButton class="mt-16" title="Get in touch" variant="line" />
		</a>
	</div>
</template>

<style scoped></style>
