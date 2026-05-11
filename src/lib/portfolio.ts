import type { TagKey } from "./palette";

export type SocialLink = {
	label: string;
	href: string;
};

export type CompetencyItem = {
	name: string;
	tag: TagKey;
};

export type Competency = {
	labelKey: string;
	icon: string;
	items: CompetencyItem[];
};

export type Project = {
	id: string;
	index: string;
	titleKey: string;
	subtitleKey: string;
	taglineKey: string;
	bodyKey: string;
	year: string;
	stack: string[];
	url?: string;
	image?: string;
};

export const PORTFOLIO = {
	name: "Dorian Moy",
	handle: "dorian-moy",
	email: "contact@dorianmoy.fr",
	socials: [
		{ label: "GitHub", href: "https://github.com/Croos3r" },
		{ label: "LinkedIn", href: "https://www.linkedin.com/in/dorian-moy/" },
	] satisfies SocialLink[],
	competencies: [
		{
			labelKey: "stack.cat.languages",
			icon: "code",
			items: [
				{ name: "TypeScript", tag: "daily" },
				{ name: "Python", tag: "shipped" },
				{ name: "Java", tag: "shipped" },
				{ name: "C/C++", tag: "shipped" },
				{ name: "Rust", tag: "daily" },
				{ name: "Haskell", tag: "learning" },
			],
		},
		{
			labelKey: "stack.cat.frontend",
			icon: "stack",
			items: [
				{ name: "React", tag: "daily" },
				{ name: "Vue", tag: "shipped" },
				{ name: "Next.js", tag: "shipped" },
				{ name: "React-Native", tag: "shipped" },
				{ name: "Tailwind", tag: "daily" },
				{ name: "Leptos", tag: "learning" },
			],
		},
		{
			labelKey: "stack.cat.backend",
			icon: "tools",
			items: [
				{ name: "NestJS", tag: "shipped" },
				{ name: "Adonis", tag: "daily" },
				{ name: "Postgres", tag: "daily" },
				{ name: "MySQL", tag: "shipped" },
				{ name: "Redis", tag: "shipped" },
				{ name: "gRPC", tag: "shipped" },
			],
		},
		{
			labelKey: "stack.cat.tools",
			icon: "branch",
			items: [
				{ name: "Docker", tag: "daily" },
				{ name: "Git", tag: "daily" },
				{ name: "Linux", tag: "daily" },
				{ name: "GitHub Actions", tag: "daily" },
				{ name: "Jenkins", tag: "shipped" },
				{ name: "Dokploy", tag: "learning" },
			],
		},
	] satisfies Competency[],
	projects: [
		{
			id: "dorianmoy",
			index: "01",
			titleKey: "projects.list.2.title",
			subtitleKey: "projects.list.2.subtitle",
			taglineKey: "projects.list.2.description",
			bodyKey: "projects.list.2.body",
			year: "2026",
			stack: ["Vue", "TypeScript", "Tailwind"],
			url: "https://dorianmoy.fr",
			image: "/dorianmoy_fr.png",
		},
		{
			id: "sorting-viz",
			index: "02",
			titleKey: "projects.list.10.title",
			subtitleKey: "projects.list.10.subtitle",
			taglineKey: "projects.list.10.description",
			bodyKey: "projects.list.10.body",
			year: "2026",
			stack: ["Rust", "Raylib"],
		},
		{
			id: "pigeactive",
			index: "03",
			titleKey: "projects.list.0.title",
			subtitleKey: "projects.list.0.subtitle",
			taglineKey: "projects.list.0.description",
			bodyKey: "projects.list.0.body",
			year: "2025",
			stack: ["Adonis", "TypeScript", "Postgres", "Tailwind", "Docker"],
			image: "/pigeactive_fr.png",
		},
		{
			id: "bedrock-app",
			index: "04",
			titleKey: "projects.list.1.title",
			subtitleKey: "projects.list.1.subtitle",
			taglineKey: "projects.list.1.description",
			bodyKey: "projects.list.1.body",
			year: "2025",
			stack: [
				"Next.js",
				"TypeScript",
				"Python",
				"Solidity",
				"Tailwind",
				"thirdweb",
				"Aleph.cloud",
				"ENS",
				"Docker",
			],
			image: "/app_bedrock_im.png",
		},
		{
			id: "cryptio-scroll-indexer",
			index: "05",
			titleKey: "projects.list.7.title",
			subtitleKey: "projects.list.7.subtitle",
			taglineKey: "projects.list.7.description",
			bodyKey: "projects.list.7.body",
			year: "2025",
			stack: ["Rust", "Scroll"],
		},
		{
			id: "libertai",
			index: "06",
			titleKey: "projects.list.3.title",
			subtitleKey: "projects.list.3.subtitle",
			taglineKey: "projects.list.3.description",
			bodyKey: "projects.list.3.body",
			year: "2024",
			stack: ["Vue", "TypeScript", "Tailwind"],
			url: "https://libertai.io",
			image: "/libertai_io.png",
		},
		{
			id: "thales-xsd-hmi",
			index: "07",
			titleKey: "projects.list.8.title",
			subtitleKey: "projects.list.8.subtitle",
			taglineKey: "projects.list.8.description",
			bodyKey: "projects.list.8.body",
			year: "2024",
			stack: ["React", "TypeScript"],
		},
		{
			id: "oca",
			index: "08",
			titleKey: "projects.list.9.title",
			subtitleKey: "projects.list.9.subtitle",
			taglineKey: "projects.list.9.description",
			bodyKey: "projects.list.9.body",
			year: "2024",
			stack: ["React-Native", "TypeScript"],
		},
		{
			id: "bedrock-hack",
			index: "09",
			titleKey: "projects.list.4.title",
			subtitleKey: "projects.list.4.subtitle",
			taglineKey: "projects.list.4.description",
			bodyKey: "projects.list.4.body",
			year: "2023",
			stack: ["React", "TypeScript", "Vite", "Tailwind"],
			url: "https://old.bedrock.im",
			image: "/old_bedrock_im.png",
		},
		{
			id: "area",
			index: "10",
			titleKey: "projects.list.5.title",
			subtitleKey: "projects.list.5.subtitle",
			taglineKey: "projects.list.5.description",
			bodyKey: "projects.list.5.body",
			year: "2023",
			stack: [
				"NestJS",
				"TypeScript",
				"Next.js",
				"Flutter",
				"Dart",
				"Go",
				"gRPC",
				"Docker",
				"Postgres",
			],
			url: "https://github.com/RezaRahemtola/Area",
			image: "/area_github.png",
		},
		{
			id: "trombiday",
			index: "11",
			titleKey: "projects.list.6.title",
			subtitleKey: "projects.list.6.subtitle",
			taglineKey: "projects.list.6.description",
			bodyKey: "projects.list.6.body",
			year: "2022",
			stack: ["NestJS", "React-Native", "TypeScript", "Docker", "Postgres"],
			url: "https://github.com/RezaRahemtola/Survivor",
			image: "/trombiday_github.png",
		},
	] satisfies Project[],
} as const;
