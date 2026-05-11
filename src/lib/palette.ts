export const PAL = {
	cream: "rgb(243,242,243)",
	ink: "rgb(27,26,33)",
	gold: "rgb(199,167,99)",
	amber: "rgb(205,139,0)",
	grayMid: "rgb(92,91,96)",
	grayDim: "rgb(144,144,144)",
} as const;

export const TAG_COLORS = {
	daily: "rgb(82, 168, 96)",
	shipped: "rgb(199, 167, 99)",
	touched: "rgb(140, 140, 150)",
	learning: "rgb(118, 152, 209)",
} as const;

export type TagKey = keyof typeof TAG_COLORS;

export const MONO_STACK = 'ui-monospace, "SF Mono", Menlo, "Cascadia Code", Consolas, monospace';
