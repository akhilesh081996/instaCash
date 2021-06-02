import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycreatedeventPage } from './mycreatedevent.page';

const routes: Routes = [
  {
    path: '',
    component: MycreatedeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycreatedeventPageRoutingModule {}
