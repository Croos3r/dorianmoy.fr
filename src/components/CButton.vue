<script lang="ts" setup>
export type CButtonProps = {
	title: string;
	variant: "fill" | "line";
};

const { variant } = withDefaults(defineProps<CButtonProps>(), {
	variant: "fill",
});
const dynamicStyle =
	variant === "fill"
		? "bg-primary dark:text-light text-dark hover:bg-dark hover:text-primary dark:hover:bg-light dark:hover:text-primary"
		: "border border-primary text-primary border-2 hover:border-dark hover:text-dark dark:hover:border-light dark:hover:text-light";
</script>

<template>
	<button
		:class="`text-center transition-all max-md:h-[4rem] max-md:w-[20rem] md:h-[4.5rem] md:w-[23rem] ${dynamicStyle}`"
	>
		{{ title }}
	</button>
</template>

<style scoped></style>
