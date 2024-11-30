import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { filter, Observable, take } from 'rxjs';

export const markFormControl = {
	usedAsync: (control: AbstractControl, updateValueAndValidity = true): Observable<boolean> => {
		return new Observable<boolean>((subscriber) => {
			markFormControl.used(control, updateValueAndValidity);
			if (control.status == 'PENDING') {
				control.statusChanges
					.pipe(
						filter((x) => x != 'PENDING'),
						take(1)
					)
					.subscribe(() => {
						subscriber.next(control.valid);
						subscriber.complete();
					});
			} else {
				subscriber.next(control.valid);
				subscriber.complete();
			}
		});
	},
	used: (control: AbstractControl, updateValueAndValidity = true) => {
		if (control.disabled) {
			return;
		}
		control.markAsDirty({ onlySelf: true });
		control.markAsTouched({ onlySelf: true });
		let childControls: AbstractControl[] = [];
		if (control instanceof UntypedFormArray) {
			childControls = control.controls;
		} else if (control instanceof UntypedFormGroup) {
			childControls = (Object as any).values(control.controls);
		} else if (control instanceof UntypedFormControl && updateValueAndValidity) {
			control.updateValueAndValidity();
		}
		childControls.forEach((childControl: AbstractControl) => {
			markFormControl.used(childControl);
		});
	},
	unused: (control: AbstractControl) => {
		if (control.disabled) {
			return;
		}
		control.markAsPristine({ onlySelf: true });
		control.markAsUntouched({ onlySelf: true });
		let childControls: AbstractControl[] = [];
		if (control instanceof UntypedFormArray) {
			childControls = control.controls;
		} else if (control instanceof UntypedFormGroup) {
			childControls = (Object as any).values(control.controls);
		}
		childControls.forEach((childControl: AbstractControl) => {
			markFormControl.unused(childControl);
		});
	},
};

