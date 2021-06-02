import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadwalletPageRoutingModule } from './loadwallet-routing.module';

import { LoadwalletPage } from './loadwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadwalletPageRoutingModule
  ],
  declarations: [LoadwalletPage]
})
export class LoadwalletPageModule {}
