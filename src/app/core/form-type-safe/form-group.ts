import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { isEmptyStringValue } from '../utils';

export type FormTypeSafeGroupControlTypes<
  ValueType,
  ControlType = AbstractControl
> = {
  [key in keyof ValueType]: ControlType;
};

export class FormTypeSafeGroup<
  ValueType,
  ControlsType extends FormTypeSafeGroupControlTypes<ValueType> = FormTypeSafeGroupControlTypes<
    ValueType,
    UntypedFormControl
  >
> extends UntypedFormGroup {
  readonly value!: ValueType;
  onReset = new Subject<Partial<ValueType>>();
  public readonly valueChanges!: Observable<ValueType>;
  uniqueId: string;

  constructor(
    public controls: ControlsType,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
    this.presetUniqueId();
  }

  presetUniqueId(): string {
    const uniqueId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (x, r) =>
        ('x' === x ? (r = (Math.random() * 16) | 0) : (r & 0x3) | 0x8).toString(
          16
        )
    );
    this.uniqueId = uniqueId;
    return uniqueId;
  }

  getRawValue(): ValueType {
    return super.getRawValue();
  }

  reset(
    value?: Partial<ValueType> | {},
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    super.reset(value, options);
    this.onReset.next(value);
  }

  getControlByKey<T extends AbstractControl = AbstractControl>(key: string): T {
    if (!isEmptyStringValue(key)) {
      const findControlBySegments = (control: AbstractControl): T => {
        if (control instanceof UntypedFormGroup) {
          if (control.get(key) != null) {
            return control.get(key) as T;
          } else {
            for (const control_key in control.controls) {
              const searchControl = findControlBySegments(
                control.controls[control_key]
              );
              if (searchControl) {
                return searchControl;
              }
            }
          }
        }
        return null;
      };

      return findControlBySegments(this);
    } else {
      return null;
    }
  }
}
