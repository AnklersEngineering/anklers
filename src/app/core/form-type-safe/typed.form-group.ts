import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormGroup,
  UntypedFormGroup,
  ValidatorFn,
  ɵFormGroupValue,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { isEmptyStringValue } from '../utils';
// import { TypedValueOf } from './typed-of';

export class TypedFormGroup<
  TControl extends {
    [K in keyof TControl]: AbstractControl<any>;
  } = any
> extends FormGroup<TControl> {
  //readonly value!: ValueType;
  onReset = new Subject<ɵFormGroupValue<TControl>>();
  //public readonly valueChanges!: Observable<ValueType>;

  constructor(
    public controls: TControl,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  reset(
    value: ɵFormGroupValue<TControl> = {},
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    super.reset(value as any, options);
    this.onReset.next(this.getRawValue() as any);
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
