import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingaddressPageRoutingModule } from './billingaddress-routing.module';

import { BillingaddressPage } from './billingaddress.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingaddressPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BillingaddressPage]
})
export class BillingaddressPageModule {}
