import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/pop-ups/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorMessage = '';
  public dialogConfig;

  constructor(
    private dialog: MatDialog,
  ) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      this.errorMessage = 'An internal error has occurred. Please contact the administrator.';
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        disableClose: true,
        panelClass: 'small-dialog-container',
        data: {
          errorMessage: this.errorMessage
        }
      });
    } else if (error.status === 404) {
      this.errorMessage = 'The content you are trying to access is not available. Please try again later.';
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        disableClose: true,
        panelClass: 'small-dialog-container',
        data: {
          errorMessage: this.errorMessage
        }
      });
    } else if (error.status === 0) {
      this.errorMessage = 'Network error! Please, try again later';
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        disableClose: true,
        panelClass: 'small-dialog-container',
        data: {
          errorMessage: this.errorMessage
        }
      });
    } else if (error.status === 401) {
      this.errorMessage = 'You do not have sufficient permissions. Please contact the administrator.';
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        disableClose: true,
        panelClass: 'small-dialog-container',
        data: {
          errorMessage: this.errorMessage
        }
      });
    } else {
      this.errorMessage = 'An internal error has occurred. Please contact the administrator.';
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        disableClose: true,
        panelClass: 'small-dialog-container',
        data: {
          errorMessage: this.errorMessage
        }
      });
    }
  }
}