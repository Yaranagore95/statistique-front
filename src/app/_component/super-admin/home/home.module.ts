import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatProgressSpinnerModule} from '@angular/material';
import {BreadcrumbModule, CardsModule, ChartsModule, IconsModule, TableModule} from 'angular-bootstrap-md';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    CardsModule,
    BreadcrumbModule,
    IconsModule,
    ChartsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class HomeModule { }
