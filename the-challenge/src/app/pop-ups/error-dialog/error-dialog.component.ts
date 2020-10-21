import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  /** Declare Variable Here */
  response: any;
  errorTitle: any;
  errorMessage: any;

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogRefData: any) {
    this.errorTitle = (dialogRefData.title) ? dialogRefData.title :  'Error';
    this.errorMessage = dialogRefData.errorMessage;
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
