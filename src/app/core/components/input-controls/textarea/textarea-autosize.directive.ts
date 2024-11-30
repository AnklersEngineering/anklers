import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	inject,
	Input,
	NgZone,
	OnChanges,
	OnDestroy,
	OnInit,
	Optional,
	Output,
	SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PlatformService } from '../../../services/platform.service';
import { BaseInputComponent } from '../common';

@Directive({
	selector: '[textAreaAutoSize]',
})
export class TextAreaAutosizeDirective implements OnDestroy, OnInit, OnChanges {
	private destroySubject = new Subject<void>();
	private textAreaEl: HTMLTextAreaElement;
	private checkHeight$: EventEmitter<void> = new EventEmitter();
	private minHeight = 32;

	@Input() minRows: number;
	@Input() maxRows: number;
	@Input() onlyGrow = false;
	@Input() disableAutoSize = true;
	@Output() resized = new EventEmitter<number>();

	// inject
	platformService = inject(PlatformService);
	// inject

	constructor(
		element: ElementRef<HTMLTextAreaElement>,
		protected zone: NgZone,
		@Optional() baseComponent: BaseInputComponent<string>
	) {
		this.textAreaEl = element.nativeElement;

		this.checkHeight$.pipe(debounceTime(10), takeUntil(this.destroySubject)).subscribe(() => {
			if (this.platformService.isBrowser) {
				this.zone.runOutsideAngular(() => {
					if (this.textAreaEl && !this.disableAutoSize) {
						this.textAreaEl.style.overflow = 'hidden';

						const currentText = this.textAreaEl.value;
						const clone: any = this.textAreaEl.cloneNode(true);
						const parent = this.textAreaEl.parentNode;
						clone.style.width = this.textAreaEl.offsetWidth + 'px';
						clone.style.visibility = 'hidden';
						clone.style.position = 'absolute';
						clone.textContent = currentText;
						clone.style.overflow = 'hidden';
						clone.style.height = null;

						parent.appendChild(clone);
						let height = clone.scrollHeight;

						// add into height top and bottom borders' width
						const computedStyle = window.getComputedStyle(clone, null);
						height += parseInt(computedStyle.getPropertyValue('border-top-width'));
						height += parseInt(computedStyle.getPropertyValue('border-bottom-width'));

						const oldHeight = this.textAreaEl.offsetHeight;
						const willGrow = height > oldHeight;

						if (this.onlyGrow === false || willGrow) {
							const lineHeight = this._getLineHeight();
							const rowsCount = height / lineHeight;

							if (this.minRows && this.minRows >= rowsCount) {
								height = this.minRows * lineHeight;
							} else if (this.maxRows && this.maxRows <= rowsCount) {
								// never shrink the textarea if onlyGrow is true
								const maxHeight = this.maxRows * lineHeight;
								height = this.onlyGrow ? Math.max(maxHeight, oldHeight) : maxHeight;
								this.textAreaEl.style.overflow = 'auto';
							} else {
								this.textAreaEl.style.overflow = 'hidden';
							}

							const heightStyle = height + 'px';
							this.textAreaEl.style.setProperty('height', heightStyle);

							this.resized.emit(height);
						}

						parent.removeChild(clone);
					} else if (this.textAreaEl && this.textAreaEl.style.overflow == 'hidden') {
						this.textAreaEl.style.overflow = '';
					}
				});
			}
		});
		if (baseComponent != null) {
			baseComponent.onChange.pipe(takeUntil(this.destroySubject)).subscribe(() => {
				this.checkHeight$.next();
			});
		}
	}

	private _getLineHeight() {
		let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
		if (isNaN(lineHeight) && window.getComputedStyle) {
			const styles = window.getComputedStyle(this.textAreaEl);
			lineHeight = parseInt(styles.lineHeight, 10);
		}

		if (isNaN(lineHeight)) {
			const fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
			lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
		}
		// FYI:dirty trick
		if (lineHeight < this.minHeight) {
			lineHeight = this.minHeight;
		}
		return lineHeight;
	}

	@HostListener('window:resize', ['$event'])
	windowResize(event?: Event) {
		this.checkHeight$.next();
	}

	update() {
		this.checkHeight$.next();
	}

	@HostListener('input', ['$event.target'])
	onInput(textArea: HTMLTextAreaElement): void {
		this.checkHeight$.next();
	}

	ngOnInit(): void {
		this.checkHeight$.next();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.minRows && this.textAreaEl && this.textAreaEl.rows != changes.minRows.currentValue) {
			this.textAreaEl.rows = changes.minRows.currentValue;
		}
		this.checkHeight$.next();
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}

