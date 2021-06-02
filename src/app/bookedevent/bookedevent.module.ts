import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedeventPageRoutingModule } from './bookedevent-routing.module';

import { BookedeventPage } from './bookedevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedeventPageRoutingModule
  ],
  declarations: [BookedeventPage]
})
export class BookedeventPageModule {}
