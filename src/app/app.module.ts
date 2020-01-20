import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgxSpinnerModule} from 'ngx-spinner';
import {registerLocaleData} from '@angular/common';
import localFr from '@angular/common/locales/fr';
import {JwtInterceptor} from './core/helper/jwtInterceptor';

registerLocaleData(localFr);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
