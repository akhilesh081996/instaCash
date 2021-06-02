import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingEventPage } from './upcoming-event.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingEventPageRoutingModule {}
