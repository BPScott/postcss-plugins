import type { PluginCreator } from 'postcss';
import { replaceAnyLink } from './replace-any-link';

/** postcss-pseudo-class-any-link plugin options */
export type pluginOptions = {
	/** Preserve the original notation. default: true */
	preserve?: boolean,
	/** Add an extra fallback for the "<area>" element in IE and Edge. default: false */
	subFeatures?: {
		areaHrefNeedsFixing?: boolean
	},
};

const creator: PluginCreator<pluginOptions> = (opts?: pluginOptions) => {
	const options = {
		preserve: true,
		...opts,
	};

	const subFeatures = {
		areaHrefNeedsFixing: false,
		...Object(options.subFeatures),
	};

	return {
		postcssPlugin: 'postcss-pseudo-class-any-link',
		Rule(rule, { result }) {
			if (!rule.selector.toLowerCase().includes(':any-link')) {
				return;
			}

			const rawSelector = rule.raws.selector && rule.raws.selector.raw || rule.selector;

			// workaround for https://github.com/postcss/postcss-selector-parser/issues/28#issuecomment-171910556
			if (rawSelector.endsWith(':')) {
				return;
			}

			replaceAnyLink(rule, result, options.preserve, subFeatures.areaHrefNeedsFixing);
		},
	};
};

creator.postcss = true;

export default creator;