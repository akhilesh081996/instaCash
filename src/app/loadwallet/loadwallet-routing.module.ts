import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadwalletPage } from './loadwallet.page';

const routes: Routes = [
  {
    path: '',
    component: LoadwalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadwalletPageRoutingModule {}
