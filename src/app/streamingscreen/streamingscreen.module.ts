import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreamingscreenPageRoutingModule } from './streamingscreen-routing.module';

import { StreamingscreenPage } from './streamingscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreamingscreenPageRoutingModule
  ],
  declarations: [StreamingscreenPage]
})
export class StreamingscreenPageModule {}
