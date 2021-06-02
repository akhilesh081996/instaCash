import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyticketPageRoutingModule } from './myticket-routing.module';

import { MyticketPage } from './myticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyticketPageRoutingModule
  ],
  declarations: [MyticketPage]
})
export class MyticketPageModule {}
