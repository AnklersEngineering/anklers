import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, forwardRef, Host, HostBinding, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseInputComponent } from '../common';

@Directive({
	selector: '[inputRadioGroup]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputRadioGroupDirective),
			multi: true,
		},
		{
			provide: BaseInputComponent,
			useExisting: forwardRef(() => InputRadioGroupDirective),
		},
	],
	// inputs: [...baseFormControlInputMetadata],
	// outputs: [...baseFormControlOutputMetadata],
})
export class InputRadioGroupDirective extends BaseInputComponent<any> {
	@HostBinding('class.input-radio-group') activeClassActive = true;
	activeValue: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

	@Input() groupName: string;

	constructor(
		elementRef: ElementRef,
		@Optional()
		@Host()
		@SkipSelf()
		controlContainer: ControlContainer,
		@Inject(DOCUMENT) document: any
	) {
		super(elementRef, controlContainer, document);
		this.onChange.pipe(takeUntil(this.destroySubject)).subscribe((value) => {
			this.activeValue.next(value);
		});
		this.selector = this.selector + ' input-radio-group';
	}

	writeValue(value) {
		super.writeValue(value);
		this.activeValue.next(value);
	}

	@Input()
	getValueAsLabel(): string {
		return this.value;
	}
}

