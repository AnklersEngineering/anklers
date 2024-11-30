import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { InputRadioGroupDirective } from './radio-group.directive';

@Component({
	selector: 'input-radio',
	templateUrl: './radio.component.html',
	// inputs: ['value', 'queryParam', 'title', 'disabled', 'formControlName', 'customError'],
	// outputs: ['onClear', 'onChange'],
})
export class InputRadioComponent implements OnInit, OnDestroy {
	private destroySubject = new Subject<void>();
	checked = false;
	@Input() value: any;
	@Input() title: string;

	@HostBinding('class.input-control') cmpClass = true;

	@HostBinding('class.disabled')
	@Input()
	disabled = false;

	readonly id: string = Math.random().toString(36).substr(2, 9);

	constructor(public inputRadioGroup: InputRadioGroupDirective) {
		this.inputRadioGroup.activeValue.pipe(debounceTime(10), takeUntil(this.destroySubject)).subscribe(() => {
			this.checkState();
		});
	}

	private checkState() {
		this.checked = this.value === this.inputRadioGroup.value;
	}

	@HostListener('click', ['$event'])
	toggleChecked(event: Event) {
		if (this.disabled) {
			return;
		}
		this.inputRadioGroup.value = this.value;
		event.preventDefault();
		event.stopPropagation();
	}

	ngOnInit() {
		this.checkState();
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}

