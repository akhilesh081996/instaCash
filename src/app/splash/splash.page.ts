import { Component, OnInit } from '@angular/core';
import { Platform,NavController,MenuController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(  
    public viewCtrl: ModalController,
     ) {
       setTimeout(()=>{
         this.viewCtrl.dismiss()
       },15000)

  }

  ngOnInit() {
  }
 
}
