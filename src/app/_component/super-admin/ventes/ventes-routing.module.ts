import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VentesComponent} from './ventes.component';

const routes: Routes = [
  {
    path: '', component: VentesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentesRoutingModule {
}
