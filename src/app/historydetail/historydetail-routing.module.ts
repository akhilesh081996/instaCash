import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorydetailPage } from './historydetail.page';

const routes: Routes = [
  {
    path: '',
    component: HistorydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorydetailPageRoutingModule {}
