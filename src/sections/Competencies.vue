<script lang="ts" setup>
import { faCode, faDisplay, faGears, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import CCompetencyCategory from "../components/CCompetencyCategory.vue";
</script>

<template>
	<div class="mt-20 grid justify-items-center gap-8 sm:grid-cols-2 xl:grid-cols-4">
		<CCompetencyCategory
			:competencies="[
				{ name: 'JS/TS', rating: 4 },
				{ name: 'Java', rating: 3 },
				{ name: 'C/C++', rating: 3 },
				{ name: 'Rust', rating: 2 },
				{ name: 'Haskell', rating: 1 },
			]"
			:icon-name="faCode"
			title="Languages"
		/>
		<CCompetencyCategory
			:competencies="[
				{ name: 'React', rating: 4 },
				{ name: 'Vue', rating: 3 },
				{ name: 'Next', rating: 3 },
				{ name: 'React-Native', rating: 3 },
				{ name: 'TailwindCSS', rating: 4 },
			]"
			:icon-name="faDisplay"
			title="Frontend"
		/>
		<CCompetencyCategory
			:competencies="[
				{ name: 'Nest', rating: 4 },
				{ name: 'Adonis', rating: 3 },
				{ name: 'PostgreSQL', rating: 3 },
				{ name: 'MySQL', rating: 3 },
				{ name: 'Redis', rating: 3 },
			]"
			:icon-name="faGears"
			title="Backend"
		/>
		<CCompetencyCategory
			:competencies="[
				{ name: 'Docker', rating: 4 },
				{ name: 'Git', rating: 3 },
				{ name: 'Linux', rating: 3 },
				{ name: 'Github Actions', rating: 2 },
				{ name: 'Jenkins', rating: 2 },
			]"
			:icon-name="faScrewdriverWrench"
			title="Tools"
		/>
	</div>
</template>

<style scoped></style>
