import { Component } from '@angular/core';
import { CoreModule } from '@web/core';

@Component({
  standalone: true,
  imports: [CoreModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class AppHeaderComponent {}
