import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  skip,
  takeUntil,
} from 'rxjs/operators';
import { FormTypeSafeGroup } from '../../../form-type-safe/form-group';
import { PlatformService } from '../../../services/platform.service';
import { getDefaultError } from './error/error.helper';

export type InputComponentValueChangedEvent<T = any> = {
  current: T;
  previous: T;
};

@Directive()
export abstract class BaseInputComponent<T>
  implements OnInit, AfterViewInit, ControlValueAccessor, OnDestroy
{
  protected onInnerValueChanged = new Subject<T>();
  protected requestToGetValueAsLabel = new Subject<void>();
  protected readonly destroySubject = new Subject<void>();
  public readonly onFormControlDefined = new ReplaySubject<void>(1);
  private _formControlName!: string;
  protected _formControl!: AbstractControl;
  protected selector!: string;
  protected __value!: T;

  // private onKeyDownEvent = this.keyDownFunc.bind(this);

  protected get _value(): T {
    return this.__value;
  }
  protected set _value(newValue: T) {
    this.__value = newValue;
    this.checkIsHasValue();
    this.requestToGetValueAsLabel.next();
    this.onInnerValueChanged.next(this.__value);
  }

  private onInitSubject: Subject<BaseInputComponent<T>> = new Subject();
  private _hostClass = '';
  private _readOnly = false;
  private readonly onChangeWithDelaySubject: Subject<T> = new Subject();
  protected onFormGroupSet: Subject<AbstractControl> =
    new Subject<AbstractControl>();
  @ViewChild('titleRef')
  private readonly titleRef!: ElementRef<HTMLElement>;

  @ViewChild('prefixRef')
  private readonly prefixRef!: ElementRef<HTMLElement>;
  @ViewChild('suffixRef')
  private readonly suffixRef!: ElementRef<HTMLElement>;

  valueAsLabel = new BehaviorSubject<string>('');
  formGroup!: UntypedFormGroup | UntypedFormArray;
  @Output() onClear = new EventEmitter<void>();
  @Output() onChange = new EventEmitter<T>();
  @Output() onChanged = new EventEmitter<InputComponentValueChangedEvent<T>>();

  hasRequiredField = new BehaviorSubject<boolean>(false);

  @Input() isSelectableControl: boolean = false; //selectable control with dropdown

  readonly id: string = Math.random().toString(36).substr(2, 9);

  isFilterValueDeleted$ = new Subject<void>();

  @Input()
  isLoading = false;

  @HostBinding('class.disabled')
  @Input()
  disabled = false;

  @Input()
  customError = false;

  @Input()
  isRequiredErrorAvailable = true;

  @Input() isShowErrorMessage: boolean = true;

  @HostBinding('class.is-invalid')
  isInvalid: boolean;

  @HostBinding('class.input-control--has-title')
  isHasTitle: boolean = false;
  titleContentValue: string;

  isHasPrefix: boolean = false;
  isHasSuffix: boolean = false;

  @HostBinding('class.input-control--autoFilled')
  isAutoFilled: boolean = false;

  @Input() errorOnHover = false;

  @Output()
  onFocus = new EventEmitter<void>();
  @Output()
  onBlur = new EventEmitter<void>();
  // @Output()
  // keyUp = new EventEmitter<KeyboardEvent>();
  @Output()
  keyDown = new EventEmitter<KeyboardEvent>();
  @Output()
  init = this.onInitSubject.asObservable();

  @HostBinding('class.input-control--has-clear')
  @Input()
  allowClear = true;

  @Output('onChangeWithDelay')
  changeWithDelay = this.onChangeWithDelaySubject
    .asObservable()
    .pipe(debounceTime(400), distinctUntilChanged());

  @HostBinding('class.focused')
  hostClassFocus = false;

  @HostBinding('class.has-value')
  hasValue: boolean;

  @Input() name: string;

  @HostBinding('class.input-show-placeholder')
  @Input()
  placeholder = '';

  @HostBinding('class.readonly')
  @Input()
  get readOnly(): boolean {
    return this._readOnly;
  }
  set readOnly(newValue: boolean) {
    this._readOnly = newValue;
  }

  @HostBinding('class')
  @Input('class')
  get cssClass(): string {
    return `input-control ${this.selector} ${this._hostClass}`;
  }
  set cssClass(newvalue: string) {
    this._hostClass = newvalue;
  }

  get defaultErrorText(): string {
    if (this.isInvalid) {
      return getDefaultError(this.formControl || this.formGroup);
    }
    return null;
  }

  get value(): T {
    return this._value;
  }
  set value(newValue: T) {
    if (newValue !== this._value) {
      const previous = this._value;
      this._value = newValue;
      this.onChangeCallback(this._value);
      this.onChange.next(this._value);
      this.onChanged.next({
        current: this._value,
        previous: previous,
      });
      this.checkIsHasValue();
    }
  }

  @Input()
  get formControl(): AbstractControl {
    return this._formControl;
  }
  set formControl(control: AbstractControl) {
    this._formControl = control;
    if (control) {
      this.formGroup = this.formControl!.parent;
      this.onFormControlDefined.next();
      this.checkValidity();
      this.formControl.statusChanges
        .pipe(
          takeUntil(this.destroySubject),
          takeUntil(this.onFormControlDefined.pipe(skip(1))),
          debounceTime(1)
        )
        // mergeMap(x=>{
        // 	if(this.formGroup && this.formGroup.status=="PENDING"){
        // 		return
        // 	}
        // }))
        .subscribe((status) => {
          if (status == 'PENDING') {
            this.isLoading = true;
          } else {
            this.isLoading = false;
            this.checkValidity();
          }
        });
      this.formControl.valueChanges
        .pipe(
          filter((x) => x != this.__value),
          takeUntil(this.destroySubject),
          takeUntil(this.onFormControlDefined.pipe(skip(1))),
          debounceTime(1)
        )

        .subscribe((value) => {
          this.__value = value;
        });
    }
  }

  get formControlName(): string {
    return this._formControlName;
  }
  @Input()
  set formControlName(newValue: string) {
    if (newValue !== this._formControlName) {
      this._formControlName = newValue;
      setTimeout(() => {
        // FYI: Timeout for correct flow in aot build
        if (
          this.formControlName &&
          this.controlContainer &&
          this.controlContainer.control
        ) {
          const control = this.controlContainer.control.get(
            this.formControlName
          );
          if (control) {
            this.formControl = control;
            return;
          }
        }
        throw new Error(`${newValue} control is not in FormGroup`);
      });
    } else if (this.formControl != null && !newValue) {
      this.formControl = undefined;
      this.onFormControlDefined.next();
    }
  }

  abstract getValueAsLabel(): string;

  // inject
  platformService = inject(PlatformService);
  // inject

  constructor(
    public elementRef: ElementRef,
    protected controlContainer: ControlContainer,
    protected document?: Document
  ) {
    if (this.platformService.isBrowser) {
      this.selector = elementRef.nativeElement.localName;
    }
    this.onChange.pipe(takeUntil(this.destroySubject)).subscribe((value) => {
      this.onChangeWithDelaySubject.next(value);
    });
    this.requestToGetValueAsLabel
      .pipe(debounceTime(5), takeUntil(this.destroySubject))
      .subscribe(() => {
        this.valueAsLabel.next(this.getValueAsLabel());
      });
    //this.onClear.pipe(debounceTime(5), takeUntil(this.destroySubject)).subscribe(() => this.checkValidity());

    // this.onChangeWithDelay.pipe(takeUntil(this.destroySubject)).subscribe((value) => {
    // 	if (this.formGroup.get(this.formControlName).value !== this.value) {
    // 		this.formValuIsDifferFromControlValue();
    // 	}
    // });

    this.onFormControlDefined
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        const initialUpdateValueAndValidity =
          this.formGroup.updateValueAndValidity;
        this.formGroup.updateValueAndValidity = (opts?: {
          onlySelf?: boolean;
          emitEvent?: boolean;
        }) => {
          initialUpdateValueAndValidity.call(this.formGroup, opts);
          this.checkIsHasValue();
          this.checkRequiredField();
        };

        if (this.formGroup instanceof FormTypeSafeGroup) {
          const findParentElement = (
            formGroup: UntypedFormGroup
          ): FormTypeSafeGroup<any, any> => {
            if (!formGroup?.parent) {
              return formGroup as any;
            }
            return findParentElement(formGroup?.parent as any);
          };
        }
        // this.formGroup.list
        // this.formGroup.valueChanges.pipe(debounceTime(100), takeUntil(this.destroySubject)).subscribe((value) => {
        // 	if (this.formGroup.get(this.formControlName).value !== this.value) {
        // 		this.formValueIsDifferFromControlValue();
        // 	}
        // });
      });
  }

  onTitleContentChange(changes: MutationRecord[], titleRef: HTMLElement) {
    const innerHtml = titleRef?.innerHTML?.trim() ?? '';
    if (innerHtml.length && titleRef.childNodes.length) {
      if (
        Array.from(titleRef.childNodes).every(
          (x) => x.nodeType == Node.COMMENT_NODE
        )
      ) {
        this.isHasPrefix = false;
        this.isHasSuffix = false;
        return;
      }
    }
    this.titleContentValue = innerHtml;
    this.isHasTitle = innerHtml.length > 0;
  }
  onPrefixContentChanged(changes: MutationRecord[], prefixRef: HTMLElement) {
    const innerHtml = prefixRef?.innerHTML?.trim() ?? '';
    if (innerHtml.length && prefixRef.childNodes.length) {
      if (
        Array.from(prefixRef.childNodes).every(
          (x) => x.nodeType == Node.COMMENT_NODE
        )
      ) {
        this.isHasPrefix = false;
        return;
      }
    }
    this.isHasPrefix = innerHtml.length > 0;
  }
  onSuffixContentChanged(changes: MutationRecord[], suffixRef: HTMLElement) {
    const innerHtml = suffixRef?.innerHTML?.trim() ?? '';
    if (innerHtml.length && suffixRef.childNodes.length) {
      if (
        Array.from(suffixRef.childNodes).every(
          (x) => x.nodeType == Node.COMMENT_NODE
        )
      ) {
        this.isHasSuffix = false;
        return;
      }
    }
    this.isHasSuffix = innerHtml.length > 0;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.platformService.isBrowser) {
        this.isAutoFilled = !!this.elementRef.nativeElement.querySelector(
          'input:-webkit-autofill'
        );
        this.onTitleContentChange(null, this.titleRef?.nativeElement);
        this.onPrefixContentChanged(null, this.prefixRef?.nativeElement);
        this.onSuffixContentChanged(null, this.suffixRef?.nativeElement);
      }
    });
  }

  // protected formValueIsDifferFromControlValue() {
  // 	this._value = this.formGroup.get(this.formControlName).value;
  // }

  checkIsHasValue() {
    this.hasValue =
      this.value !== undefined &&
      this.value != null &&
      this.value.toString().length > 0;
  }

  clearValue() {
    this.value = null;
    this.onClear.next();
  }

  checkValidity(): Promise<boolean> {
    this.checkIsHasValue();
    return new Promise((resolve) => {
      if (this.formGroup != null) {
        this.checkRequiredField();
      }
      if (this.customError) {
        this.isInvalid = true;
      } else if (this.formControl != null) {
        this.isInvalid =
          this.formControl.invalid &&
          (this.formControl.dirty || this.formControl.touched);
      } else {
        this.isInvalid = false;
      }
      resolve(this.isInvalid);
    });
  }

  blur() {
    setTimeout(() => {
      this.hostClassFocus = false;
      this.onBlur.emit();
    });
  }

  focus() {
    this.hostClassFocus = true;
    this.onFocus.emit();
    // if (document) {
    // 	// this.document.addEventListener('keyup', this.onKeyUpEvent);
    // 	this.document.addEventListener('keydown', this.onKeyDownEvent);
    // }
  }

  ngOnInit(): void {
    this.onInitSubject.next(this);
  }

  checkRequiredField = (control?: AbstractControl): boolean => {
    const abstractControl: AbstractControl = this.formControl;
    if (abstractControl && abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);

      if (validator && validator.required) {
        this.hasRequiredField.next(true);
        return this.hasRequiredField.value;
      }
    }
    // this code for FormGroup
    // if (abstractControl && abstractControl['controls'] != null) {
    // 	for (const controlName in abstractControl['controls']) {
    // 		if (abstractControl['controls'][controlName]) {
    // 			if (this.hasRequiredField(abstractControl['controls'][controlName])) {
    // 				return true;
    // 			}
    // 		}
    // 	}
    // }
    this.hasRequiredField.next(false);
    return this.hasRequiredField.value;
  };

  //#region ControlValueAccessor interface

  onTouchedCallback: () => void = () => {};
  onChangeCallback: (_: T) => void = () => {};
  writeValue(obj: T): void {
    this._value = obj;
    this.checkIsHasValue();
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  //#endregion

  // ngOnChanges(changes: SimpleChanges): void {
  // 	for (const key of Object.keys(changes)) {
  // 		if (this[key] instanceof Params.Base) {
  // 			const queryParam: Params.Base = this[key];
  // 			if (key === 'queryParam' && queryParam != null) {
  // 				merge(of(queryParam.value), queryParam.onChanged, queryParam.onInit)
  // 					.pipe(takeUntil(this.destroySubject))
  // 					.subscribe(() => {
  // 						this._value = queryParam.value;
  // 					});
  // 				if (queryParam.value != this.value) {
  // 					this._value = queryParam.value;
  // 				}
  // 			} else if (key === 'customError') {
  // 				this.checkValidity();
  // 			}
  // 		}
  // 	}
  // }

  // private removeEvents() {
  // 	if (this.document) {
  // 		// this.document.removeEventListener('keyup', this.onKeyUpEvent);
  // 		this.document.removeEventListener('keydown', this.onKeyDownEvent);
  // 	}
  // }

  // private keyUp(event: KeyboardEvent) {
  //   this.onKeyUp.next(event);
  // }
  // private keyDownFunc(event: KeyboardEvent) {
  // 	this.keyDown.next(event);
  // }
  onKeyDown(event: KeyboardEvent) {
    this.keyDown.next(event);
  }

  ngOnDestroy(): void {
    // this.removeEvents();
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
