import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmoneyPageRoutingModule } from './addmoney-routing.module';

import { AddmoneyPage } from './addmoney.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmoneyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddmoneyPage]
})
export class AddmoneyPageModule {}
