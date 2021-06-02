import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QruserPageRoutingModule } from './qruser-routing.module';

import { QruserPage } from './qruser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QruserPageRoutingModule
  ],
  declarations: [QruserPage]
})
export class QruserPageModule {}
