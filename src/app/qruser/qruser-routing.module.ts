import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QruserPage } from './qruser.page';

const routes: Routes = [
  {
    path: '',
    component: QruserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QruserPageRoutingModule {}
