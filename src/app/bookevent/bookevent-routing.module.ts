import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookeventPage } from './bookevent.page';

const routes: Routes = [
  {
    path: '',
    component: BookeventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookeventPageRoutingModule {}
