import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser";
import { CoreModule } from "@web/core";
import { markFormControl } from "src/app/core/utils";
import { ContactFormSuccessModalComponent } from "./success-modal/success-modal.component";

export enum ProjectType {
  crmSystem = "CRM System",
  erpSystem = "ERP System",
  marketplace = "Marketplace",
  website = "Website",
  branding = "Branding",
}

export interface FormGroupModel {
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
  imports: [CoreModule, MatDialogModule],
  selector: "section-contacts",
  templateUrl: "./section-contacts.component.html",
})
export class SectionContactsComponent implements OnInit {
  projectType = ProjectType;

  readonly dialog = inject(MatDialog);

  formGroup = new FormGroup<ToFormControl<FormGroupModel>>({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    companyName: new FormControl(null, Validators.required),
    message: new FormControl(),
    projectType: new FormControl(),
  });

  isLoading: boolean = false;

  constructor() {}

  ngOnInit() {}

  onOpenSuccessModal() {
    this.dialog.open(ContactFormSuccessModalComponent, {
      width: "23.5vw",
    });
  }

  onSubmitForm() {
    markFormControl.used(this.formGroup);

    if (this.formGroup.valid) {
      this.isLoading = true;
      emailjs
        .send("service_gk9ecil", "template_k2jw9rm", this.formGroup.value, {
          publicKey: "xF3MC_dUzBq4i2yul",
        })
        .then(
          () => {
            this.isLoading = false;
            this.formGroup.reset(null);
            this.onOpenSuccessModal();
          },
          (error) => {
            console.log("FAILED...", (error as EmailJSResponseStatus).text);
          }
        );
    }
  }
}
