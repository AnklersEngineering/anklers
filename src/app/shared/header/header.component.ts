import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CoreModule } from "@web/core";
import { PlatformService } from "@web/core/services";
import { fromEvent } from "rxjs";
import { ContactSalesCardModalComponent } from "../contact-card-modal/contact-card-modal.component";

@Component({
  standalone: true,
  imports: [CoreModule, MatDialogModule],
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./styles.scss",
})
export class AppHeaderComponent implements AfterViewInit {
  isShowStickyHeader = signal<boolean>(false);
  isShowMobileMenu = signal<boolean>(false);

  // stickyHeader
  showFromTopInPx: number = 100;
  // stickyHeader

  // inject
  readonly destroyRef = inject(DestroyRef);
  readonly platformService = inject(PlatformService);
  readonly dialog = inject(MatDialog);
  // inject

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      let previousScrollPosition = 0;
      let isScrollingDown: boolean = false;
      fromEvent(window, "scroll")
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response) => {
          const currentScrollPosition =
            window.scrollY || document.documentElement.scrollTop;
          isScrollingDown = currentScrollPosition > previousScrollPosition;
          previousScrollPosition = currentScrollPosition;

          if (scrollY < this.showFromTopInPx) {
            this.isShowStickyHeader.set(false);
            return;
          }

          if (scrollY > this.showFromTopInPx && !isScrollingDown) {
            this.isShowStickyHeader.set(true);
          } else {
            this.isShowStickyHeader.set(false);
          }
        });
    }
  }

  onToggleMobileMenu() {
    this.isShowMobileMenu.set(!this.isShowMobileMenu());
  }

  onOpenContactSalesCardModal() {
    this.dialog.open(ContactSalesCardModalComponent, {
      width: "23.5vw",
    });
  }
}
