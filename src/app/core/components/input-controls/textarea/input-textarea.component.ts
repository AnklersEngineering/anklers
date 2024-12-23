import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  forwardRef,
  Host,
  HostBinding,
  Inject,
  Input,
  Optional,
  SkipSelf,
  ViewChild,
} from "@angular/core";
import { ControlContainer, NG_VALUE_ACCESSOR } from "@angular/forms";

import { debounceTime, mergeMap, takeUntil } from "rxjs/operators";
import { BaseInputComponent } from "../common";
import { TextAreaAutosizeDirective } from "./textarea-autosize.directive";

@Component({
  selector: "input-textarea",
  templateUrl: "./input-textarea.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true,
    },
    {
      provide: BaseInputComponent,
      useExisting: forwardRef(() => InputTextareaComponent),
    },
  ],

  styleUrl: "../text/styles.scss",
  exportAs: "inputTextarea",
})
export class InputTextareaComponent extends BaseInputComponent<string> {
  @Input()
  autocomplete: string;

  @ViewChild("currentInput") currentInput: ElementRef<HTMLInputElement>;

  @ViewChild(TextAreaAutosizeDirective)
  textAreaAutosizeDirective: TextAreaAutosizeDirective;

  @HostBinding("class.input-control--autosize")
  @Input()
  autosize = false;
  /**
   * @param if set null maxRows will be with infinitely rows
   */
  @Input() maxRows = 5;

  @Input() minRows = 5;

  @Input() showTextCounter = false;

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
