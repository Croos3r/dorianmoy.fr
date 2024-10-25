<script lang="ts" setup>
import CCompetency, { CCompetencyProps } from "./CCompetency.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type CCompetencyCategoryProps = {
	title: string;
	iconName: IconDefinition;
	competencies: Array<CCompetencyProps>;
};

defineProps<CCompetencyCategoryProps>();
</script>

<template>
	<div class="flex w-52 flex-col gap-y-14 text-dark dark:text-light">
		<FontAwesomeIcon :icon="iconName" class="h-12" />
		<h3 class="w-full text-center">{{ title }}</h3>
		<div class="flex flex-col gap-y-2.5">
			<CCompetency v-for="{ name, rating } in competencies" :key="name" :name="name" :rating="rating" />
		</div>
	</div>
</template>

<style scoped></style>
