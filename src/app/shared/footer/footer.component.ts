import { Component, ViewEncapsulation } from '@angular/core';
import { CoreModule } from '@web/core';

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
}