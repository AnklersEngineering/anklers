import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChildren,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PlatformService } from "@web/core/services";
import { ContactSalesCardModalComponent } from "@web/shared/contact-card-modal/contact-card-modal.component";
import Atropos from "atropos";

@Component({
  standalone: true,
  imports: [],
  selector: "section-process",
  templateUrl: "./section-process.component.html",
})
export class SectionProcessComponent implements AfterViewInit {
  // inject
  readonly dialog = inject(MatDialog);
  platformService = inject(PlatformService);
  // inject

  listOfCardEffects = viewChildren<ElementRef>("cardEffect");

  constructor() {}

  onOpenContactSalesCardModal() {
    this.dialog.open(ContactSalesCardModalComponent, {
      width: "400px",
    });
  }

  private init3dCardEffect() {
    // https://atroposjs.com/docs

    this.listOfCardEffects().forEach((x) => {
      Atropos({
        el: x.nativeElement,
        activeOffset: 40,
        shadow: false,
        // rotateXMax: 8,
        // rotateYMax: 8,

        // rest of parameters
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.init3dCardEffect();
    }
  }
}
