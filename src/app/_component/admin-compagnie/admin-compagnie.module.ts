import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminCompagnieComponent} from './admin-compagnie.component';
import {RouterModule, Routes} from '@angular/router';
import {CardsModule, TableModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeModule} from './home/home.module';
import {AdminCompagnieModuleRouting} from './admin-compagnie.module.routing';

@NgModule({
  declarations: [AdminCompagnieComponent],
  imports: [
    AdminCompagnieModuleRouting,
    CommonModule,
    CardsModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminCompagnieModule { }
