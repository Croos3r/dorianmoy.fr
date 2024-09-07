<script lang="ts" setup>
export type CSectionProps = {
	id: string;
	title: string;
	number: number;
};

defineProps<CSectionProps>();
</script>

<template>
	<section :id="id" class="my-24">
		<div class="flex w-full gap-14 max-md:flex-col md:items-center">
			<h2 class="shrink-0 text-light">{{ number > 9 ? number : `0${number}` }}/ {{ title }}</h2>
			<div class="h-1 w-full bg-light" />
		</div>
		<div class="container mx-auto">
			<slot />
		</div>
	</section>
</template>

<style scoped></style>
