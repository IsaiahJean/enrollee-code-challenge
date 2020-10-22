import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IEnrollees } from '../models/enrollees.entities';
import { EditEnrolleeComponent } from '../pop-ups/edit-enrollee/edit-enrollee.component';
import { ErrorHandlerService } from '../shared/service/error-handler.service';
import { HttpService } from '../shared/service/http.service';
import { SpinnerService } from '../shared/service/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

     /**
   * Declare Variable Here
   */
  showLoader: boolean;
  dataSource: MatTableDataSource<IEnrollees[]>;
  enrollees: any;
  displayedColumns: string[] = [
    'id', 'active','name', 'dateOfBirth','edit'
  ];
  loadingComplete = false;

  constructor(
    private spinnerService: SpinnerService,
    private httpService: HttpService,
    private errorService: ErrorHandlerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEnrollees();
  }

  ngAfterViewInit(): void {
  }

  getEnrollees() {
    this.spinnerService.display(true);
    this.httpService.getResponse().subscribe(
      (response) => {
        this.enrollees = response;
        this.dataSource = new MatTableDataSource<IEnrollees[]>(this.enrollees);
        this.loadingComplete = true;
        this.spinnerService.display(false);
      },
      (error) => {
        this.errorService.handleError(error);
        this.spinnerService.display(false);
      }
    )
  }

  openEditDialog(line) {
    const editEnrolleeDialog = this.dialog.open(EditEnrolleeComponent, {
      height: '70vh',
      width: '40vw',
      disableClose: true,
      data: {
        lineItems: line
      }
    });
    editEnrolleeDialog.afterClosed().subscribe(result => {
      if (result.event === true) {
        this.getEnrollees();
      }
    });
  }

}
