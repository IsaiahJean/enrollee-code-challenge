import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { CommonModule } from '@angular/common';
import { MaterialmodulesModule } from './modules/materialmodules/materialmodules.module';
import { HttpService } from './shared/service/http.service';
import { ErrorDialogComponent } from './pop-ups/error-dialog/error-dialog.component';
import { SpinnerService } from './shared/service/spinner.service';
import { ErrorHandlerService } from './shared/service/error-handler.service';
import { EditEnrolleeComponent } from './pop-ups/edit-enrollee/edit-enrollee.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    EditEnrolleeComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialmodulesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    SpinnerService,
    HttpService,
    ErrorHandlerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
