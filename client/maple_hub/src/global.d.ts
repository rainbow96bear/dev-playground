import * as $ from 'jquery';

declare global {
	interface Window {
		jQuery: typeof $;
	}
	interface JQueryStatic {
		rwdImageMaps(): void;
	}
	namespace App {
		interface Locals {
			characterCache: Map<string, any>;
			itemCache: Map<string, any>;
			sundayEventCache: any;
		}
	}
}

export {};
