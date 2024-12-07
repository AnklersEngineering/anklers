import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SALES_PHONE } from '@web/core/contacts';

@Component({
  standalone: true,
  imports: [],
  selector: 'contact-sales-card-modal',
  templateUrl: './contact-card-modal.component.html',
  host: {
    class: 'p-10 text-center flex-col relative'
  }
})

export class ContactSalesCardModalComponent  {

  readonly dialogRef = inject(MatDialogRef<ContactSalesCardModalComponent>);
  

  SALES_PHONE = SALES_PHONE;
  constructor() { }



  onClose(): void {
    this.dialogRef.close();
  }
}