import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlatformService } from '../../../../services/platform.service';
import { getDefaultError } from './error.helper';

@Component({
  selector: 'form-control-error',
  templateUrl: './error.component.html',
})
export class ErrorFormComponent implements OnDestroy, AfterViewInit {
  private _control: AbstractControl = null;
  protected readonly destroySubject: Subject<void> = new Subject<void>();
  @ViewChild('errorMessageContainer')
  protected errorMessageContainer: ElementRef;

  // tslint:disable-next-line:ban-types

  isActive = false;
  isOverflowTooltip = false;
  errorMessage: string = null;
  @Input()
  get control(): AbstractControl {
    return this._control;
  }
  set control(newControl: AbstractControl) {
    this._control = newControl;
    if (this._control) {
      this._control.statusChanges
        .pipe(takeUntil(this.destroySubject))
        .subscribe(() => {
          this.checkDefaultError();
        });
      this.checkDefaultError();
    }
  }

  // inject
  platformService = inject(PlatformService);
  // inject

  constructor(private element: ElementRef) {}

  private checkDefaultError() {
    if (this.control.dirty) {
      this.errorMessage = getDefaultError(this.control);
      this.isActive = !this.isEmptyStringValue(this.errorMessage);
      if (this.isActive) {
        this.checkOverflowMessage();
      }
    }
  }

  private isEmptyStringValue(value: any): boolean {
    return value == null || value.length === 0;
  }

  private checkOverflowMessage() {
    setTimeout(() => {
      if (this.errorMessageContainer && this.platformService.isBrowser) {
        this.isOverflowTooltip =
          this.element.nativeElement.parentElement.offsetWidth <
          this.errorMessageContainer.nativeElement.offsetWidth;
      }
    });
  }

  ngAfterViewInit(): void {
    this.checkOverflowMessage();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
