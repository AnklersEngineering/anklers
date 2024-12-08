import { Component, ViewEncapsulation } from '@angular/core';
import { CoreModule } from '@web/core';
import { SALES_PHONE, SALES_PREVIEW_PHONE } from '@web/core/contacts';

@Component({
  standalone: true,
  imports: [CoreModule],
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  host: {
    class: '',
  }
})
export class AppFooterComponent {
  email: string = 'hello@anklers.tech';


  SALES_PHONE = SALES_PHONE;
  SALES_PREVIEW_PHONE = SALES_PREVIEW_PHONE;
}