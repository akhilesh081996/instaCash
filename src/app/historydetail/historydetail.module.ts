import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorydetailPageRoutingModule } from './historydetail-routing.module';

import { HistorydetailPage } from './historydetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorydetailPageRoutingModule
  ],
  declarations: [HistorydetailPage]
})
export class HistorydetailPageModule {}
