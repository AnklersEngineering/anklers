import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CoreModule } from "@web/core";
import { AppFooterComponent } from "@web/shared/footer/footer.component";
import { AppHeaderComponent } from "@web/shared/header/header.component";

@Component({
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, CoreModule],
  selector: "privacy-policy-page",
  templateUrl: "./privacy-policy.page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyPageComponent {
  constructor() {}
}
