import { AfterViewInit, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoreModule } from '@web/core';
import { PlatformService } from '@web/core/services';
import { fromEvent } from 'rxjs';

@Component({
  standalone: true,
  imports: [CoreModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class AppHeaderComponent implements AfterViewInit {

  isShowStickyHeader = signal<boolean>(false);

  // stickyHeader
  showFromTopInPx: number = 100;
  // stickyHeader


  // inject
  destroyRef = inject(DestroyRef);
  platformService = inject(PlatformService);
  // inject




  ngAfterViewInit(): void {
    if(this.platformService.isBrowser){
      let previousScrollPosition = 0;
      let isScrollingDown: boolean = false;
      fromEvent(window, 'scroll').pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {

        const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
        isScrollingDown = currentScrollPosition > previousScrollPosition;
        previousScrollPosition = currentScrollPosition;

        if(scrollY < this.showFromTopInPx){
          this.isShowStickyHeader.set(false);
          return;
        }

        if(scrollY > this.showFromTopInPx && !isScrollingDown){
          this.isShowStickyHeader.set(true);
        } else {
          this.isShowStickyHeader.set(false);
        }
      });
    }
  }
}
