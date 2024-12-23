import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  forwardRef,
  Host,
  Inject,
  Input,
  Optional,
  SkipSelf,
  ViewChild,
} from "@angular/core";
import { ControlContainer, NG_VALUE_ACCESSOR } from "@angular/forms";
import { debounceTime, mergeMap, takeUntil } from "rxjs/operators";
import { BaseInputComponent } from "../common";

@Component({
  selector: "input-text",
  templateUrl: "./input-text.component.html",
  styleUrl: "./styles.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
    {
      provide: BaseInputComponent,
      useExisting: forwardRef(() => InputTextComponent),
    },
  ],
  // inputs: [...baseFormControlInputMetadata, 'autocomplete'],
  // outputs: [...baseFormControlOutputMetadata],
  exportAs: "inputText",
})
export class InputTextComponent extends BaseInputComponent<string> {
  @Input()
  autocomplete: string;

  @ViewChild("currentInput") currentInput: ElementRef<HTMLInputElement>;

  // @HostListener('window:keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  // 	if (event.keyCode === Key.Enter && this.hostClassFocus) {
  // 		this.currentInput.nativeElement.blur();
  // 	}
  // }

  @Input()
  type: "text" | "email" = "text";

  constructor(
    elementRef: ElementRef,
    @Optional()
    @Host()
    @SkipSelf()
    controlContainer: ControlContainer,
    @Inject(DOCUMENT) document: any
  ) {
    super(elementRef, controlContainer, document);
    this.onClear
      .pipe(debounceTime(10), takeUntil(this.destroySubject))
      .subscribe(() => this.currentInput.nativeElement.focus());

    this.onChanged
      .pipe(
        mergeMap(() => this.onBlur),
        takeUntil(this.destroySubject)
      )
      .subscribe(() => {
        if (
          this.value &&
          this.value?.length &&
          (this.value[0] == " " || this.value[this.value.length - 1] == " ")
        ) {
          this.value = this.value.trim();
        }
      });
  }

  @Input()
  getValueAsLabel(): string {
    return this.value;
  }
}
