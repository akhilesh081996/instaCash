import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulestreamingPage } from './schedulestreaming.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulestreamingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulestreamingPageRoutingModule {}
