import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class LoginModuleRouting {
}
