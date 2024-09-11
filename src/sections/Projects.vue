<template>
	<div class="flex justify-around gap-y-5">
		<CProjectThumbnail
			description="A simple portfolio for my personal use, the one you're currently browsing."
			light
			thumbnail="dorianmoy_fr.png"
			title="dorianmoy.fr"
			url="https://dorianmoy.fr"
		/>
		<CProjectThumbnail
			description="The LibertAI website, explaining the project and its goals."
			thumbnail="libertai_io.png"
			title="libertai.io"
			url="https://libertai.io"
		/>
		<CProjectThumbnail
			description="A confidential version of Notion/Obsidian, on the blockchain. The best of both worlds."
			light
			thumbnail="bedrock_im.png"
			title="bedrock.im"
			url="https://bedrock.im"
		/>
	</div>
</template>
<script lang="ts" setup>
import CProjectThumbnail from "../components/CProjectThumbnail.vue";
</script>
<style></style>
