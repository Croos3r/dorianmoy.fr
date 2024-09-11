<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

export type CProjectThumbnailProps = {
	title: string;
	description: string;
	thumbnail: `${string}.png`;
	url: string;
	light?: boolean;
};

withDefaults(defineProps<CProjectThumbnailProps>(), { light: false });
</script>

<template>
	<div class="w-[22.5vw]">
		<a :href="url">
			<div
				:style="`background-image: url('/src/assets/${thumbnail}')`"
				class="group relative h-[28.75rem] bg-cover bg-center bg-no-repeat"
			>
				<FontAwesomeIcon
					:class="{ 'group-hover:text-light': light, 'group-hover:text-dark': !light }"
					:icon="faCircleRight"
					class="absolute bottom-8 right-8 h-12 w-12 text-primary transition-all"
				/>
			</div>
		</a>
		<h3 class="mt-5 text-primary">{{ title }}</h3>
		<p class="mt-2 text-dark dark:text-light">{{ description }}</p>
	</div>
</template>

<style scoped></style>
