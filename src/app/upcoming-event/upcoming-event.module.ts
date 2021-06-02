import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingEventPageRoutingModule } from './upcoming-event-routing.module';

import { UpcomingEventPage } from './upcoming-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingEventPageRoutingModule
  ],
  declarations: [UpcomingEventPage]
})
export class UpcomingEventPageModule {}
