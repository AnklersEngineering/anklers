import { DestroyRef, HostListener, inject, Injectable, NgZone, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlatformService } from './platform.service';

export enum MediaBreakpoint {
	xs = 0,
	sm = 545,
	md = 768,
	lg = 1025,
	xl = 1200,
	xxl = 1300,
}

interface MediaEntryItemType {
	query?: MediaQueryList;
	breakpoint: MediaBreakpoint;
}
interface MediaEntryType {
	xs: MediaEntryItemType;
	sm: MediaEntryItemType;
	md: MediaEntryItemType;
	lg: MediaEntryItemType;
	xl: MediaEntryItemType;
	xxl: MediaEntryItemType;
}

@Injectable()
export class MediaQueriesService {
	private activeMediaSubject: BehaviorSubject<MediaBreakpoint> = new BehaviorSubject(MediaBreakpoint.xs);

	private mediaEntry: MediaEntryType = {
		xs: { breakpoint: MediaBreakpoint.xs },
		sm: { breakpoint: MediaBreakpoint.sm },
		md: { breakpoint: MediaBreakpoint.md },
		lg: { breakpoint: MediaBreakpoint.lg },
		xl: { breakpoint: MediaBreakpoint.xl },
		xxl: { breakpoint: MediaBreakpoint.xxl },
	};

	isMdSize = signal<boolean>(false);
	isLgSize = signal<boolean>(false);

	// inject
	destroyRef = inject(DestroyRef);
	platformService = inject(PlatformService);
	// inject

	activeMedia: Observable<MediaBreakpoint> = this.activeMediaSubject.asObservable();

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		// console.log('event.target.innerWidth');
		// this.width = event.target.innerWidth;
	}

	constructor(private zone: NgZone) {
		if (this.platformService.isBrowser) {
			this.mediaEntry.xs.query = matchMedia(`(max-width: ${MediaBreakpoint.sm}px)`);
			this.mediaEntry.sm.query = matchMedia(
				`(min-width: ${MediaBreakpoint.sm}px) and (max-width: ${MediaBreakpoint.md}px)`
			);
			this.mediaEntry.md.query = matchMedia(
				`(min-width: ${MediaBreakpoint.md}px) and (max-width: ${MediaBreakpoint.lg}px)`
			);
			this.mediaEntry.lg.query = matchMedia(
				`(min-width: ${MediaBreakpoint.lg}px) and (max-width: ${MediaBreakpoint.xl}px)`
			);
			this.mediaEntry.xl.query = matchMedia(
				`(min-width: ${MediaBreakpoint.xl}px) and (max-width: ${MediaBreakpoint.xxl}px)`
			);
			this.mediaEntry.xxl.query = matchMedia(`(min-width: ${MediaBreakpoint.xxl}px)`);

			const mediaEntriesKeys = Object.keys(this.mediaEntry);
			mediaEntriesKeys.forEach((key, index) => {
				const entry = this.mediaEntry[key];
				if (entry.query.matches) {
					this.activeMediaSubject.next(entry.breakpoint);
				}
				entry.query.addListener((mql) => {
					this.zone.run(() => {
						if (mql.matches) {
							this.activeMediaSubject.next(entry.breakpoint);
						}
					});
				});
			});

			for (let i = mediaEntriesKeys.length - 1; i > 0; i--) {
				const entry = this.mediaEntry[mediaEntriesKeys[i]] as MediaEntryItemType;
				if (entry.query.matches) {
					this.activeMediaSubject.next(entry.breakpoint);
					break;
				}
			}
		} else {
			this.activeMediaSubject.next(MediaBreakpoint.lg);
		}

		this.activeMedia.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.checkMediaSizes();
		});
	}

	isLessThan(media: MediaBreakpoint, takeCoincidence: boolean = true) {
		return takeCoincidence ? this.activeMediaSubject.value <= media : this.activeMediaSubject.value < media;
	}
	isMoreThan(media: MediaBreakpoint, takeCoincidence: boolean = true): boolean {
		return takeCoincidence ? this.activeMediaSubject.value >= media : this.activeMediaSubject.value > media;
	}

	private checkMediaSizes() {
		this.isMdSize.set(this.activeMediaSubject.value < MediaBreakpoint.md);
		this.isLgSize.set(this.activeMediaSubject.value < MediaBreakpoint.lg);
	}
}

