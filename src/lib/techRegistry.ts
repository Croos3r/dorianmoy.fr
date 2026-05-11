export type TechEntry = {
	slug: string;
	hex: string;
	mono: string;
	fg?: string;
	home: string;
};

export const TECH_REGISTRY: Record<string, TechEntry> = {
	TypeScript: { slug: "typescript", hex: "3178c6", mono: "TS", home: "https://www.typescriptlang.org" },
	JavaScript: { slug: "javascript", hex: "f7df1e", mono: "JS", fg: "#1a1a1a", home: "https://developer.mozilla.org/docs/Web/JavaScript" },
	Python: { slug: "python", hex: "3776ab", mono: "Py", home: "https://www.python.org" },
	Java: { slug: "openjdk", hex: "ed8b00", mono: "Jv", home: "https://openjdk.org" },
	Rust: { slug: "rust", hex: "000000", mono: "Rs", home: "https://www.rust-lang.org" },
	Haskell: { slug: "haskell", hex: "5e5086", mono: "Hs", home: "https://www.haskell.org" },
	"C/C++": { slug: "cplusplus", hex: "00599c", mono: "C+", home: "https://isocpp.org" },
	React: { slug: "react", hex: "149eca", mono: "Re", home: "https://react.dev" },
	"React-Native": { slug: "react", hex: "149eca", mono: "RN", home: "https://reactnative.dev" },
	Leptos: { slug: "leptos", hex: "ef3939", mono: "Lp", home: "https://leptos.dev" },
	Vue: { slug: "vuedotjs", hex: "42b883", mono: "Vu", home: "https://vuejs.org" },
	"Next.js": { slug: "nextdotjs", hex: "000000", mono: "Nx", home: "https://nextjs.org" },
	Flutter: { slug: "flutter", hex: "02569b", mono: "Fl", home: "https://flutter.dev" },
	Dart: { slug: "dart", hex: "0175c2", mono: "Dt", home: "https://dart.dev" },
	Go: { slug: "go", hex: "00add8", mono: "Go", home: "https://go.dev" },
	NestJS: { slug: "nestjs", hex: "e0234e", mono: "Ns", home: "https://nestjs.com" },
	Tailwind: { slug: "tailwindcss", hex: "06b6d4", mono: "Tw", home: "https://tailwindcss.com" },
	Vite: { slug: "vite", hex: "646cff", mono: "Vi", home: "https://vite.dev" },
	Postgres: { slug: "postgresql", hex: "4169e1", mono: "Pg", home: "https://www.postgresql.org" },
	MySQL: { slug: "mysql", hex: "4479a1", mono: "My", home: "https://www.mysql.com" },
	Adonis: { slug: "adonisjs", hex: "5a45ff", mono: "Ad", home: "https://adonisjs.com" },
	gRPC: { slug: "grpc", hex: "244c5a", mono: "gR", home: "https://grpc.io" },
	Solidity: { slug: "solidity", hex: "363636", mono: "Sl", home: "https://soliditylang.org" },
	thirdweb: { slug: "thirdweb", hex: "f213a4", mono: "tw", home: "https://thirdweb.com" },
	"Aleph.cloud": { slug: "aleph", hex: "00d1ff", fg: "#1a1a1a", mono: "Ac", home: "https://aleph.cloud" },
	ENS: { slug: "ens", hex: "5298ff", mono: "EN", home: "https://ens.domains" },
	Scroll: { slug: "scrollprotocol", hex: "ff684b", mono: "Sc", home: "https://scroll.io" },
	Raylib: { slug: "raylib", hex: "ffffff", fg: "#1a1a1a", mono: "Rl", home: "https://www.raylib.com" },
	Redis: { slug: "redis", hex: "dc382d", mono: "Rd", home: "https://redis.io" },
	Docker: { slug: "docker", hex: "2496ed", mono: "Dk", home: "https://www.docker.com" },
	Git: { slug: "git", hex: "f05032", mono: "Gt", home: "https://git-scm.com" },
	GraphQL: { slug: "graphql", hex: "e10098", mono: "GQ", home: "https://graphql.org" },
	Supabase: { slug: "supabase", hex: "3ecf8e", mono: "Sb", fg: "#1a1a1a", home: "https://supabase.com" },
	Jenkins: { slug: "jenkins", hex: "d24939", mono: "Jk", home: "https://www.jenkins.io" },
	Linux: { slug: "linux", hex: "fcc624", fg: "#1a1a1a", mono: "Lx", home: "https://www.kernel.org" },
	"GitHub Actions": { slug: "githubactions", hex: "2088ff", mono: "GA", home: "https://docs.github.com/actions" },
	Dokploy: { slug: "dokploy", hex: "ec5d5e", mono: "Dk", home: "https://dokploy.com" },
	CircleCI: { slug: "circleci", hex: "343434", mono: "Cr", home: "https://circleci.com" },
};

export const getTechHome = (name: string) => TECH_REGISTRY[name]?.home;
