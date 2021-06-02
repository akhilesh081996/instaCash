import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycreatedeventPageRoutingModule } from './mycreatedevent-routing.module';

import { MycreatedeventPage } from './mycreatedevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycreatedeventPageRoutingModule
  ],
  declarations: [MycreatedeventPage]
})
export class MycreatedeventPageModule {}
