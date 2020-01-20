import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {VoyagesRoutingModule} from './voyages-routing.module';
import {MatProgressSpinnerModule} from '@angular/material';
import {
  BreadcrumbModule,
  ButtonsModule,
  CardsModule,
  ChartsModule,
  IconsModule,
  ModalModule,
  TableModule,
  WavesModule
} from 'angular-bootstrap-md';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VoyagesComponent} from './voyages.component';

@NgModule({
  declarations: [VoyagesComponent],
  imports: [
    CommonModule,
    VoyagesRoutingModule,
    MatProgressSpinnerModule,
    CardsModule,
    BreadcrumbModule,
    IconsModule,
    ChartsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    ButtonsModule,
    WavesModule,
    ModalModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}]
})
export class VoyagesModule { }
