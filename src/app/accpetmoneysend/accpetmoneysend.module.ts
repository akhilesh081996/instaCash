import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccpetmoneysendPageRoutingModule } from './accpetmoneysend-routing.module';

import { AccpetmoneysendPage } from './accpetmoneysend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccpetmoneysendPageRoutingModule
  ],
  declarations: [AccpetmoneysendPage]
})
export class AccpetmoneysendPageModule {}
