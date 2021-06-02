import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveeventPageRoutingModule } from './liveevent-routing.module';

import { LiveeventPage } from './liveevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveeventPageRoutingModule
  ],
  declarations: [LiveeventPage]
})
export class LiveeventPageModule {}
