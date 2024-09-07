<script lang="ts" setup>
export type CCompetencyProps = {
	name: string;
	rating: 1 | 2 | 3 | 4 | 5;
};

defineProps<CCompetencyProps>();
</script>

<template>
	<div class="flex items-center justify-between text-dark dark:text-light">
		<span>{{ name }}</span>
		<div class="flex gap-x-1.5">
			<div v-for="i in Array(rating).fill(0)" :key="i" class="h-2.5 w-2.5 rounded-full bg-primary" />
		</div>
	</div>
</template>

<style scoped></style>
