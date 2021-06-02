import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamingscreenPage } from './streamingscreen.page';

const routes: Routes = [
  {
    path: '',
    component: StreamingscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamingscreenPageRoutingModule {}
