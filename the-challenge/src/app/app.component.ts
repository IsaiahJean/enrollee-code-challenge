import { AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { SpinnerService } from './shared/service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterContentChecked, AfterViewChecked {

    /**
   * Declare Variable Here
   */
  showLoader: boolean;

  constructor(
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewChecked(): void {
    // this.cdr.detectChanges();
  }

  ngAfterContentChecked(): void {
    this.spinnerService.status.subscribe((val: boolean) => {
      // setTimeout(() => 10000);
      this.showLoader = val;
    });
  }

}
