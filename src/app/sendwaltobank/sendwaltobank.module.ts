import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendwaltobankPageRoutingModule } from './sendwaltobank-routing.module';

import { SendwaltobankPage } from './sendwaltobank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendwaltobankPageRoutingModule
  ],
  declarations: [SendwaltobankPage]
})
export class SendwaltobankPageModule {}
