import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeModuleRouting} from './home.module.routing';
import {CardsModule, TableModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeModuleRouting,
    CardsModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}]
})
export class HomeModule { }
