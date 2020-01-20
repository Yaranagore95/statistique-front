import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRippleModule
} from '@angular/material';

import {InputsModule, CardsModule, CheckboxModule, ButtonsModule, WavesModule} from 'angular-bootstrap-md';
const routes: Routes = [{ path: '', component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    InputsModule,
    CardsModule,
    CheckboxModule,
    ButtonsModule,
    WavesModule
  ]
})
export class LoginModule { }
