import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    name: [this.enrolleeDetails.name, [Validators.required, Validators.pattern(/^[^0-9 ]+ ?[^0-9 ]+$/i)]],
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
  }

  editEnrollee() {
    this.spinnerService.display(true);
    console.log(this.editEnrolleeForm.value);
    this.http.putById(this.editEnrolleeForm.value.id, this.editEnrolleeForm.value).subscribe(
      (response) => {
        this.updateSuccesful = response;
        this.spinnerService.display(false);
      },
      (error) => {
        this.errorService.handleError(error);
        this.spinnerService.display(false);
      },
      () => {
          this.dialogRef.close({ event: true });
          this.spinnerService.display(false);
          this.openSnackBar(this.message, 'ok');
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

  getValidationErrorMessages(controlName: string, fieldLabel: string) {
    let result: string[] = [];
    let control = this.editEnrolleeForm.get(controlName);
    if (control.hasError("required")) {
      result.push(fieldLabel + " is required.");
    }
    if (control.hasError("pattern")) {
      if (controlName === "name")
      result.push(fieldLabel + " must not contain numbers and spaces.");
    }
    return result;
  }

}
