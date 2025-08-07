<script lang="ts" setup></script>
<template>
	<div class="flex justify-between text-dark 2xl:ml-72 dark:text-light">
		<!-- eslint-disable-next-line vue/no-v-html -->
		<p class="max-w-[850px]" v-html="$t('aboutMe.description')"></p>
		<img
			:alt="$t('aboutMe.altText')"
			class="h-64 w-64 bg-dark text-light max-md:hidden dark:bg-light dark:text-dark"
			src="../assets/dorianmoy.png"
		/>
	</div>
</template>
<style scoped></style>
