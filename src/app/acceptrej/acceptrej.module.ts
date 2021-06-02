import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptrejPageRoutingModule } from './acceptrej-routing.module';

import { AcceptrejPage } from './acceptrej.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptrejPageRoutingModule
  ],
  declarations: [AcceptrejPage]
})
export class AcceptrejPageModule {}
