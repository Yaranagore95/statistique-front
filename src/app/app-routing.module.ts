import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/helper/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./_component/super-admin/super-admin.module').then(m => m.SuperAdminModule),
  },
  {path: 'login', loadChildren: () => import('./_component/login/login.module').then(m => m.LoginModule)},
  {
    path: '',
    loadChildren: () => import('./_component/admin-compagnie/admin-compagnie.module').then(m => m.AdminCompagnieModule),
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
