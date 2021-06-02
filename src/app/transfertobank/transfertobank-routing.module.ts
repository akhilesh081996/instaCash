import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfertobankPage } from './transfertobank.page';

const routes: Routes = [
  {
    path: '',
    component: TransfertobankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfertobankPageRoutingModule {}
