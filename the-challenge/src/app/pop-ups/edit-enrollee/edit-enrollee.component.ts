import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/shared/service/error-handler.service';
import { HttpService } from 'src/app/shared/service/http.service';
import { SpinnerService } from 'src/app/shared/service/spinner.service';

@Component({
  selector: 'app-edit-enrollee',
  templateUrl: './edit-enrollee.component.html',
  styleUrls: ['./edit-enrollee.component.scss']
})
export class EditEnrolleeComponent implements OnInit {
  /**
   * declare variables here
   */
  enrolleeDetails = this.data.lineItems;
  editEnrolleeForm = this.fb.group({
    id: [this.enrolleeDetails.id],
    name: [this.enrolleeDetails.name],
    active: [this.enrolleeDetails.active],
    dateOfBirth: [this.enrolleeDetails.dateOfBirth]
  });
  updateSuccesful: any;
  message = 'Enrollee Details Have Been Updated.';

  constructor(
    public dialogRef: MatDialogRef<EditEnrolleeComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private http: HttpService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private errorService: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
  }

  editEnrollee() {
    this.spinnerService.display(true);
    console.log(this.editEnrolleeForm.value);
    this.http.putById(this.editEnrolleeForm.value.id, this.editEnrolleeForm.value).subscribe(
      (response) => {
        this.updateSuccesful = response;
        this.spinnerService.display(false);
        console.log('edit enrollee PUT request succesful', response);
      },
      (error) => {
        this.errorService.handleError(error);
        this.spinnerService.display(false);
        console.log('edit enrollee PUT error', error);
      },
      () => {
          this.dialogRef.close({ event: true });
          this.spinnerService.display(false);
          this.openSnackBar(this.message, null);
          console.log('edit enrollee PUT complete', this.updateSuccesful);
        }
    );
  }

  cancelEditEnrollee() {
    this.dialogRef.close({event: false});
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}