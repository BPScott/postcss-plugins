export const convert_s: Map<string, (number: number) => number> = new Map([
	[
		'ms',
		(x: number) => {
			return x * 1000;
		},
	],
	[
		's',
		(x: number) => {
			return x;
		},
	],
]);
