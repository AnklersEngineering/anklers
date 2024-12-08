import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@web/core';
import { AppFooterComponent } from '@web/shared/footer/footer.component';
import { AppHeaderComponent } from '@web/shared/header/header.component';
import { SectionContactsComponent } from '@web/shared/sections/section-contacts/section-contacts.component';

@Component({
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, CoreModule, SectionContactsComponent],
  selector: 'contacts-page',
  templateUrl: './contacts.page.component.html'
})

export class ContactsPageComponent  {
  constructor() { }

}