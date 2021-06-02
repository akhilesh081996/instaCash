import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestreamingPageRoutingModule } from './schedulestreaming-routing.module';

import { SchedulestreamingPage } from './schedulestreaming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestreamingPageRoutingModule
  ],
  declarations: [SchedulestreamingPage]
})
export class SchedulestreamingPageModule {}
