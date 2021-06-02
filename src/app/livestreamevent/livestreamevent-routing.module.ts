import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivestreameventPage } from './livestreamevent.page';

const routes: Routes = [
  {
    path: '',
    component: LivestreameventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivestreameventPageRoutingModule {}
