<script lang="ts" setup>
import CButton from "../components/CButton.vue";
</script>

<template>
	<section class="max-sm:text-center">
		<div class="flex flex-col gap-y-2.5 text-dark dark:text-light">
			<p>{{ $t("intro.greeting") }}</p>
			<h1 class="max-sm:leading-none">{{ $t("intro.name") }}</h1>
			<p class="max-sm:text-sm md:leading-8">
				{{ $t("intro.title") }}<br />
				{{ $t("intro.subtitle1") }}<br />
				{{ $t("intro.subtitle2") }}
			</p>
		</div>
		<div class="mt-16 flex gap-8 max-lg:flex-col">
			<a href="mailto://contact@dorianmoy.fr">
				<CButton :title="$t('intro.getInTouch')" variant="line" />
			</a>
			<a
				:href="$i18n.locale === 'en' ? '/resume_dorian_moy_en.pdf' : '/curriculum_vitae_dorian_moy_fr.pdf'"
				target="_blank"
			>
				<CButton :title="$t('intro.viewResume')" variant="fill" />
			</a>
		</div>
	</section>
</template>

<style scoped></style>
