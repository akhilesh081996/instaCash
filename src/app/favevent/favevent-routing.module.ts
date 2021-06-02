import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaveventPage } from './favevent.page';

const routes: Routes = [
  {
    path: '',
    component: FaveventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaveventPageRoutingModule {}
