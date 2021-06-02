import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplygiftcardPage } from './applygiftcard.page';

const routes: Routes = [
  {
    path: '',
    component: ApplygiftcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplygiftcardPageRoutingModule {}
