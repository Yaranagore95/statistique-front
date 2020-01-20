import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuperAdminComponent} from './super-admin.component';
import {SuperAdminModuleRouting} from './super-admin.module.routing';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SuperAdminComponent],
  imports: [
    SuperAdminModuleRouting,
    CommonModule,
    FormsModule
  ],
})
export class SuperAdminModule { }
