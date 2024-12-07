import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from "@angular/core";
import { Application } from "@splinetool/runtime";
import { CoreModule } from "@web/core";
import { PlatformService } from "@web/core/services";
import { AppFooterComponent } from "@web/shared/footer/footer.component";
import { AppHeaderComponent } from "@web/shared/header/header.component";
import { SectionContactsComponent } from "@web/shared/sections/section-contacts/section-contacts.component";
import { SectionProcessComponent } from "@web/shared/sections/section-process/section-process.component";
import { SectionTeamComponent } from "@web/shared/sections/section-team/section-team.component";
import { SectionTechnologiesComponent } from "@web/shared/sections/section-technologies/section-technologies.component";

@Component({
  standalone: true,
  imports: [
    AppHeaderComponent,
    AppFooterComponent,
    CoreModule,
    SectionContactsComponent,
    SectionTeamComponent,
    SectionProcessComponent,
    SectionTechnologiesComponent,
  ],
  selector: "home-page",
  templateUrl: "./home-page.component.html",
})
export class HomePageComponent implements OnInit, AfterViewInit {
  // inject
  platformService = inject(PlatformService);

  // inject
  animationContainer = viewChild<ElementRef>("animationContainer");

  constructor() {}

  ngOnInit() {}

  private welcomeSectionAnimation() {
    const app = new Application(this.animationContainer().nativeElement);
    app.load("https://prod.spline.design/KJhcbAloCWS5GeLW/scene.splinecode");
  }

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this.welcomeSectionAnimation();
    }
  }
}
