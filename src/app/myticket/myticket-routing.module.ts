import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyticketPage } from './myticket.page';

const routes: Routes = [
  {
    path: '',
    component: MyticketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyticketPageRoutingModule {}
