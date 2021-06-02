import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateeventPageRoutingModule } from './createevent-routing.module';

import { CreateeventPage } from './createevent.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateeventPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateeventPage]
})
export class CreateeventPageModule {}
