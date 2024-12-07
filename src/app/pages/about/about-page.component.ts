import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@web/core';
import { AppFooterComponent } from '@web/shared/footer/footer.component';
import { AppHeaderComponent } from '@web/shared/header/header.component';
import { SectionContactsComponent } from '@web/shared/sections/section-contacts/section-contacts.component';
import { SectionTeamComponent } from '@web/shared/sections/section-team/section-team.component';

@Component({
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, CoreModule, SectionTeamComponent, SectionContactsComponent],
  selector: 'about-page',
  templateUrl: './about-page.component.html'
})

export class AboutPageComponent  {
  constructor() { }

}