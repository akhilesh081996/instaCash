import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingaddressPage } from './billingaddress.page';

const routes: Routes = [
  {
    path: '',
    component: BillingaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingaddressPageRoutingModule {}
