import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VentesRoutingModule} from './ventes-routing.module';
import {MatProgressSpinnerModule} from '@angular/material';
import {BreadcrumbModule, CardsModule, ChartsModule, IconsModule, InputsModule, TableModule} from 'angular-bootstrap-md';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VentesComponent} from './ventes.component';

@NgModule({
  declarations: [VentesComponent],
  imports: [
    CommonModule,
    VentesRoutingModule,
    MatProgressSpinnerModule,
    CardsModule,
    BreadcrumbModule,
    IconsModule,
    ChartsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    InputsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}]
})
export class VentesModule { }
