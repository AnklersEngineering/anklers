import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@web/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markFormControl } from 'src/app/core/utils';

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
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    companyName: new FormControl(null, Validators.required),
    message: new FormControl(),
    projectType: new FormControl()
  });
  

  constructor() { }

  ngOnInit() { }


  onSubmitForm() {
    markFormControl.used(this.formGroup);

    if(this.formGroup.valid){
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
}