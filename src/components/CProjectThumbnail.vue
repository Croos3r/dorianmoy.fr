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
	<div class="max-md::w-[60vw] md:w-[35vw] lg:w-[22.5vw]">
		<a :href="url" target="_blank">
			<div
				:style="`background-image: url('/${thumbnail}')`"
				class="group relative bg-cover bg-center bg-no-repeat max-md:h-[60vw] md:h-[35vw] lg:h-[22.5vw]"
			>
				<FontAwesomeIcon
					:class="{ 'group-hover:text-light': !light, 'group-hover:text-dark': light }"
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
