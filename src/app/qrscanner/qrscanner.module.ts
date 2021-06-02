import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrscannerPageRoutingModule } from './qrscanner-routing.module';

import { QrscannerPage } from './qrscanner.page';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrscannerPageRoutingModule,
    NgxBarcodeModule
  ],
  declarations: [QrscannerPage]
})
export class QrscannerPageModule {}
