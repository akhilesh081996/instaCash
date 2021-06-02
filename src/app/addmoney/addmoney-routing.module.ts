import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmoneyPage } from './addmoney.page';

const routes: Routes = [
  {
    path: '',
    component: AddmoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmoneyPageRoutingModule {}
