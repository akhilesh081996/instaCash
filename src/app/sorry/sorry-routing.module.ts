import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SorryPage } from './sorry.page';

const routes: Routes = [
  {
    path: '',
    component: SorryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SorryPageRoutingModule {}
