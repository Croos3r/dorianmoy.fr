/**
 * Names of the line icons drawn by `TerminalIcon.vue`. Kept here (rather than
 * inside the component) so the data layer can reference icon names without the
 * data → component dependency, and must stay in sync with the v-if chain in
 * that component's template.
 */
export type TerminalIconName =
	| "code"
	| "stack"
	| "tools"
	| "branch"
	| "arrowUR"
	| "sun"
	| "moon"
	| "monitor"
	| "globe"
	| "folder"
	| "download"
	| "send"
	| "check";
