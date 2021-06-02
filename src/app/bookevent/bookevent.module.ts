import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookeventPageRoutingModule } from './bookevent-routing.module';

import { BookeventPage } from './bookevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookeventPageRoutingModule
  ],
  declarations: [BookeventPage]
})
export class BookeventPageModule {}
