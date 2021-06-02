import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveeventPage } from './liveevent.page';

const routes: Routes = [
  {
    path: '',
    component: LiveeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveeventPageRoutingModule {}
