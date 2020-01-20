import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VoyagesComponent} from './voyages.component';

const routes: Routes = [
  {
    path: '', component: VoyagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoyagesRoutingModule {
}
