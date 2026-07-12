import type { TagKey } from "./palette";
import type { TechName } from "./techRegistry";
import type { TerminalIconName } from "./icons";

export type SocialLink = {
	label: string;
	href: string;
};

export type CompetencyItem = {
	name: TechName;
	tag: TagKey;
};

export type Competency = {
	labelKey: string;
	icon: TerminalIconName;
	items: CompetencyItem[];
};

export type Project = {
	id: string;
	index: string;
	year: string;
	stack: TechName[];
	url?: string;
	image?: string;
};

/** Localised text fields for a project, stored under `projects.list.<id>`. */
export type ProjectTextField = "title" | "subtitle" | "description" | "body";

/** i18n key for a project's localised text — single source of the key shape. */
export const projectText = (project: Project, field: ProjectTextField) => `projects.list.${project.id}.${field}`;

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
				{ name: "Haskell", tag: "shipped" },
				{ name: "Go", tag: "learning" },
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
				{ name: "TanStack Start", tag: "learning" },
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
				{ name: "MongoDB", tag: "shipped" },
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
				{ name: "Claude Code", tag: "daily" },
				{ name: "opencode", tag: "daily" },
				{ name: "Jenkins", tag: "shipped" },
				{ name: "Dokploy", tag: "learning" },
			],
		},
	] satisfies Competency[],
	projects: [
		{
			id: "remcontrol",
			index: "01",
			year: "2026",
			stack: ["Rust", "React-Native", "WebSocket", "Bluetooth", "Claude Code", "opencode"],
			url: "https://github.com/Croos3r/remcontrol",
		},
		{
			id: "dj-track-organizer",
			index: "02",
			year: "2026",
			stack: ["Python", "Rekordbox", "Claude Code"],
			url: "https://github.com/Croos3r/dj-track-organizer",
		},
		{
			id: "dorianmoy",
			index: "03",
			year: "2026",
			stack: ["Vue", "TypeScript", "Tailwind", "Claude Code"],
			url: "https://dorianmoy.fr",
			image: "/dorianmoy_fr.webp",
		},
		{
			id: "sorting-viz",
			index: "04",
			year: "2026",
			stack: ["Rust", "Raylib"],
		},
		{
			id: "pigeactive",
			index: "05",
			year: "2025",
			stack: ["Adonis", "TypeScript", "Postgres", "Tailwind", "Docker", "Claude Code"],
			image: "/pigeactive_fr.webp",
		},
		{
			id: "bedrock-app",
			index: "06",
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
				"Claude Code",
			],
			image: "/app_bedrock_im.webp",
		},
		{
			id: "cryptio-scroll-indexer",
			index: "07",
			year: "2025",
			stack: ["Rust", "Scroll"],
		},
		{
			id: "libertai",
			index: "08",
			year: "2024",
			stack: ["Vue", "TypeScript", "Tailwind"],
			url: "https://libertai.io",
			image: "/libertai_io.webp",
		},
		{
			id: "thales-xsd-hmi",
			index: "09",
			year: "2024",
			stack: ["React", "TypeScript"],
		},
		{
			id: "oca",
			index: "10",
			year: "2024",
			stack: ["React-Native", "TypeScript"],
		},
		{
			id: "bedrock-hack",
			index: "11",
			year: "2023",
			stack: ["React", "TypeScript", "Vite", "Tailwind"],
			url: "https://old.bedrock.im",
			image: "/old_bedrock_im.webp",
		},
		{
			id: "area",
			index: "12",
			year: "2023",
			stack: ["NestJS", "TypeScript", "Next.js", "Flutter", "Dart", "Go", "gRPC", "Docker", "Postgres"],
			url: "https://github.com/RezaRahemtola/Area",
			image: "/area_github.webp",
		},
		{
			id: "glados",
			index: "13",
			year: "2023",
			stack: ["Haskell"],
		},
		{
			id: "trombiday",
			index: "14",
			year: "2023",
			stack: ["NestJS", "React-Native", "TypeScript", "Docker", "Postgres"],
			url: "https://github.com/RezaRahemtola/Survivor",
			image: "/trombiday_github.webp",
		},
		{
			id: "zozio-battery",
			index: "15",
			year: "2022",
			stack: ["Python", "Postgres"],
		},
		{
			id: "zozio-core",
			index: "16",
			year: "2022",
			stack: ["Express", "JavaScript", "Redis", "Docker", "GitLab CI"],
		},
		{
			id: "zozio-react-migration",
			index: "17",
			year: "2022",
			stack: ["React", "TypeScript"],
		},
		{
			id: "hermes",
			index: "18",
			year: "2020",
			stack: ["Java", "MySQL", "RabbitMQ"],
		},
		{
			id: "dracojump",
			index: "19",
			year: "2020",
			stack: ["Java", "MongoDB"],
		},
	] satisfies Project[],
} as const;
