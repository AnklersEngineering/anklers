import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@web/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { FormControl, FormGroup } from '@angular/forms';

export enum ProjectType {
  crmSystem = 'CRM System',
  erpSystem = 'ERP System',
  marketplace = 'Marketplace',
  website = 'Website',
  branding = 'Branding',
}

export interface FormGroupModel{
  name: string;
  email: string;
  companyName: string;
  message: string;
  projectType: ProjectType;
}

export type ToFormControl<T> = {
  [K in keyof T]: FormControl<T[K]>;
 };
 

@Component({
  standalone: true,
  imports: [CoreModule],
  selector: 'section-contacts',
  templateUrl: './section-contacts.component.html'
})

export class SectionContactsComponent implements OnInit {

  projectType = ProjectType;

  
  formGroup = new FormGroup<ToFormControl<FormGroupModel>>({
    name: new FormControl(null),
    email: new FormControl(null),
    companyName: new FormControl(null),
    message: new FormControl(null),
    projectType: new FormControl(null)
  });
  

  constructor() { }

  ngOnInit() { }


  onSubmitForm() {

    emailjs
      .send('service_gk9ecil', 'template_k2jw9rm', this.formGroup.value, {
        publicKey: 'xF3MC_dUzBq4i2yul',
      })
      .then(
        () => {
          alert('SUCCESS!');
          this.formGroup.reset(null);
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}