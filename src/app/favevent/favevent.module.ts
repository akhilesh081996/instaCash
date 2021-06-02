import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaveventPageRoutingModule } from './favevent-routing.module';

import { FaveventPage } from './favevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaveventPageRoutingModule
  ],
  declarations: [FaveventPage]
})
export class FaveventPageModule {}
