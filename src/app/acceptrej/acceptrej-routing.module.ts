import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptrejPage } from './acceptrej.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptrejPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptrejPageRoutingModule {}
