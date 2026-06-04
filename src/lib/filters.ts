import { ref } from "vue";
import type { TechName } from "./techRegistry";

// Shared multi-tech filter state for the projects section. Other sections
// (e.g. the competencies/stack section) push values into it to deep-link
// users from a tech card straight to the matching projects.
export const selectedTechs = ref<TechName[]>([]);

export const setFilter = (techs: TechName[]) => {
	selectedTechs.value = [...techs];
};

export const addToFilter = (tech: TechName) => {
	if (!selectedTechs.value.includes(tech)) selectedTechs.value = [...selectedTechs.value, tech];
};

export const scrollToProjects = () => {
	const el = document.querySelector('[data-section-id="projects"]') as HTMLElement | null;
	el?.scrollIntoView({ behavior: "smooth", block: "start" });
};
