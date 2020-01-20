import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminCompagnieComponent} from './admin-compagnie.component';
import {AuthGuard} from '../../core/helper/auth.guard';

/*const routes: Routes = [
  { path: '', component: AdminCompagnieComponent }
  ];*/
const routes: Routes = [
  {
    path: '',
    component: AdminCompagnieComponent,
    children: [
      {path: 'admin-compagnie/home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdminCompagnieModuleRouting {
}
