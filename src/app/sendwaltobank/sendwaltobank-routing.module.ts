import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendwaltobankPage } from './sendwaltobank.page';

const routes: Routes = [
  {
    path: '',
    component: SendwaltobankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendwaltobankPageRoutingModule {}
