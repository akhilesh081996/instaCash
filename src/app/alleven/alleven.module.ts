import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllevenPageRoutingModule } from './alleven-routing.module';

import { AllevenPage } from './alleven.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllevenPageRoutingModule
  ],
  declarations: [AllevenPage]
})
export class AllevenPageModule {}
