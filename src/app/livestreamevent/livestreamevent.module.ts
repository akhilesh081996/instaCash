import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivestreameventPageRoutingModule } from './livestreamevent-routing.module';

import { LivestreameventPage } from './livestreamevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivestreameventPageRoutingModule
  ],
  declarations: [LivestreameventPage]
})
export class LivestreameventPageModule {}
