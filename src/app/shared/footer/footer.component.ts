import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CoreModule } from "@web/core";
import { SALES_PHONE, SALES_PREVIEW_PHONE } from "@web/core/contacts";

@Component({
  standalone: true,
  imports: [CoreModule],
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "",
  },
})
export class AppFooterComponent {
  email: string = "hello@anklers.tech";

  currentDate: Date = new Date();

  SALES_PHONE = SALES_PHONE;
  SALES_PREVIEW_PHONE = SALES_PREVIEW_PHONE;
}
