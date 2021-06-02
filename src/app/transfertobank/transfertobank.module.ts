import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfertobankPageRoutingModule } from './transfertobank-routing.module';

import { TransfertobankPage } from './transfertobank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfertobankPageRoutingModule
  ],
  declarations: [TransfertobankPage]
})
export class TransfertobankPageModule {}
