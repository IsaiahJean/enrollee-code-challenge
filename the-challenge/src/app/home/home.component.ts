import { AfterContentChecked, ChangeDetectorRef, AfterViewInit, Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IEnrollees } from '../models/enrollees.entities';
import { EditEnrolleeComponent } from '../pop-ups/edit-enrollee/edit-enrollee.component';
import { ErrorHandlerService } from '../shared/service/error-handler.service';
import { HttpService } from '../shared/service/http.service';
import { SpinnerService } from '../shared/service/spinner.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

     /**
   * Declare Variable Here
   */
  showLoader: boolean;
  enrollees: any;
  loadingComplete = false;
  displayedColumns: string[] = [
    'id', 'active','name', 'dateOfBirth','edit'
  ];
  dataSource: MatTableDataSource<IEnrollees[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private cdf: ChangeDetectorRef, 
    private spinnerService: SpinnerService,
    private httpService: HttpService,
    private errorService: ErrorHandlerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEnrollees();
  }

  ngAfterViewChecked(): void {
    this.cdf.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEnrollees() {
    this.spinnerService.display(true);
    this.httpService.getResponse().subscribe(
      (response) => {
        this.enrollees = response;
        this.dataSource = new MatTableDataSource<IEnrollees[]>(this.enrollees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
