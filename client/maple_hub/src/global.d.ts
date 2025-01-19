import * as $ from 'jquery';

declare global {
	interface Window {
		jQuery: typeof $;
	}
	interface JQueryStatic {
		rwdImageMaps(): void;
	}
}

export {};
