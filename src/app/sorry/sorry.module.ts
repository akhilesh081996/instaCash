import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SorryPageRoutingModule } from './sorry-routing.module';

import { SorryPage } from './sorry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SorryPageRoutingModule
  ],
  declarations: [SorryPage]
})
export class SorryPageModule {}
