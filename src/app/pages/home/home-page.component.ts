import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { Application } from '@splinetool/runtime';
import { CoreModule } from '@web/core';
import { PlatformService } from '@web/core/services';
import { AppFooterComponent } from '@web/shared/footer/footer.component';
import { AppHeaderComponent } from '@web/shared/header/header.component';

@Component({
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, CoreModule],
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, AfterViewInit {
  // inject
  platformService = inject(PlatformService);
  // inject
  animationContainer = viewChild<ElementRef>('animationContainer');

  constructor() {}

  test1: number = 0;
  ngOnInit() {}
  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      const app = new Application(this.animationContainer().nativeElement);

      app.load('https://prod.spline.design/KJhcbAloCWS5GeLW/scene.splinecode');
    }
  }
}
