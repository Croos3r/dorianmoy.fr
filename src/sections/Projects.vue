<template>
	<div class="grid justify-items-center gap-y-10 max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		<CProjectThumbnail
			description="A simple portfolio for my personal use, the one you're currently browsing."
			thumbnail="dorianmoy_fr.png"
			title="dorianmoy.fr"
			url="https://dorianmoy.fr"
		/>
		<CProjectThumbnail
			description="The LibertAI website, explaining the project and its goals."
			light
			thumbnail="libertai_io.png"
			title="libertai.io"
			url="https://libertai.io"
		/>
		<CProjectThumbnail
			description="A confidential version of Notion/Obsidian, on the blockchain. The best of both worlds."
			thumbnail="bedrock_im.png"
			title="bedrock.im"
			url="https://bedrock.im"
		/>
		<CProjectThumbnail
			description="Mobile and web fullstack application that automates communications and tasks between internet services."
			light
			thumbnail="area_github.png"
			title="Area (School project)"
			url="https://github.com/RezaRahemtola/Area"
		/>
		<CProjectThumbnail
			description="A small mobile application featuring a customisable dashboard composed of different widgets based on your geolocation."
			light
			thumbnail="trombiday_github.png"
			title="Trombiday (School project)"
			url="https://github.com/RezaRahemtola/Survivor"
		/>
	</div>
</template>
<script lang="ts" setup>
import CProjectThumbnail from "../components/CProjectThumbnail.vue";
</script>
<style></style>
