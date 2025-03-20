<template>
	<div class="grid justify-items-center gap-y-10 max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		<CProjectThumbnail
			description="A simple and efficient SaaS tool to allow french real estate agents to find and manage their leads."
			picture-position="left"
			thumbnail="pigeactive_fr.png"
			title="pigeactive.fr"
			url="https://pigeactive.fr"
		/>
		<CProjectThumbnail
			description="My End of Studies project, a all in one suite for managing your personal and professional documents. The next decentralized and confidential Office 365/Google Suite."
			light
			picture-position="left"
			thumbnail="app_bedrock_im.png"
			title="app.bedrock.im (School Project)"
			url="https://app.bedrock.im"
		/>
		<CProjectThumbnail
			description="A simple portfolio for my personal use, the one you're currently browsing."
			picture-position="left"
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
			description="The first iteration of my End of Studies project, a confidential and decentralized version of Notion/Obsidian."
			thumbnail="old_bedrock_im.png"
			title="bedrock.im (72h Hackathon Winner)"
			url="https://old.bedrock.im"
		/>
		<CProjectThumbnail
			description="Mobile and web fullstack application that automates communications and tasks between internet services."
			light
			picture-position="left"
			thumbnail="area_github.png"
			title="Area (School project)"
			url="https://github.com/RezaRahemtola/Area"
		/>
		<CProjectThumbnail
			description="A small mobile application featuring a customisable dashboard composed of different widgets based on your geolocation."
			light
			picture-position="left"
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
