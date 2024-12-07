import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [],
  selector: 'contact-form-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrl: './styles.scss',
  host: {
    class: 'p-10 text-center flex-col relative'
  }
})

export class ContactFormSuccessModalComponent  {

  readonly dialogRef = inject(MatDialogRef<ContactFormSuccessModalComponent>);
  
  constructor() { }



  onClose(): void {
    this.dialogRef.close();
  }
}