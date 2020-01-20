import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuperAdminComponent} from './super-admin.component';

const routes: Routes = [
  {path: '', redirectTo: 'super-admin/home', pathMatch: 'full'},
  {
    path: '',
    component: SuperAdminComponent,
    children: [
      {path: 'super-admin/home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      // tslint:disable-next-line:max-line-length
      {path: 'super-admin/ventes-compagnie/:id', loadChildren: () => import('./ventes/ventes.module').then(m => m.VentesModule)},
    // tslint:disable-next-line:max-line-length
      {path: 'super-admin/voyages-compagnie/:id', loadChildren: () => import('./voyages/voyages.module').then(m => m.VoyagesModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminModuleRouting {

}
