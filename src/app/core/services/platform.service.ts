import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable()
export class PlatformService {
	private _isBrowser: boolean;
	private _isServer: boolean;
	get isBrowser() {
		return this._isBrowser;
	}
	get isServer() {
		return this._isServer;
	}

	constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) {
		if (isPlatformBrowser(this.platformId)) {
			this._isBrowser = true;
			this._isServer = false;
		} else {
			this._isBrowser = false;
			this._isServer = true;
		}
	}

	loadStyle(styleName: string) {
		if (this.isBrowser) {
			const head = this.document.getElementsByTagName('head')[0];
			let themeLink = this.document.getElementById('client-theme') as HTMLLinkElement;
			if (themeLink) {
				themeLink.href = styleName;
			} else {
				const style = this.document.createElement('link');
				style.id = 'client-theme';
				style.rel = 'stylesheet';
				style.href = `${styleName}`;
				head.appendChild(style);
			}
		}
	}
}
