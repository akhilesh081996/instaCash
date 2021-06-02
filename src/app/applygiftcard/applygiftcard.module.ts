import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplygiftcardPageRoutingModule } from './applygiftcard-routing.module';

import { ApplygiftcardPage } from './applygiftcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplygiftcardPageRoutingModule
  ],
  declarations: [ApplygiftcardPage]
})
export class ApplygiftcardPageModule {}
