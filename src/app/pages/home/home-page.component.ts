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
import { SectionContactsComponent } from '@web/shared/sections/section-contacts/section-contacts.component';

@Component({
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, CoreModule, SectionContactsComponent],
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, AfterViewInit {
  // inject
  platformService = inject(PlatformService);
  // inject
  animationContainer = viewChild<ElementRef>('animationContainer');

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      const app = new Application(this.animationContainer().nativeElement);

      app.load('https://prod.spline.design/KJhcbAloCWS5GeLW/scene.splinecode');
    }
  }
}
