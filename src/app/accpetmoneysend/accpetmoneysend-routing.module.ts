import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccpetmoneysendPage } from './accpetmoneysend.page';

const routes: Routes = [
  {
    path: '',
    component: AccpetmoneysendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccpetmoneysendPageRoutingModule {}
