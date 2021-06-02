import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-applygiftcard',
  templateUrl: './applygiftcard.page.html',
  styleUrls: ['./applygiftcard.page.scss'],
})
export class ApplygiftcardPage implements OnInit {
  giftcard 
  giftcardapply = false
  user
  amountofcard = 0
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public UserService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  verify(){
    var audio = new Audio('assets/moneycont.wav');
    audio.play()
    this.UserService.showLoader()
    const option ={
      token:this.user.token,
      card_code:this.giftcard
    }
    this.UserService.sendData('giftCardVerification',option).subscribe(res =>{
   audio.pause()
      if(res['status_code'] == '200'){
        this.UserService.dismissLoading()
        this.amountofcard = res['card_value']
        this.giftcardapply = true
        this.UserService.presentAlert(res['msg'])
      }
      if(res['status_code'] == '201'){
        this.UserService.dismissLoading()
        this.UserService.presentAlert(res['errormsg'])
      } 
      if(res['status_code'] == '202'){
        this.UserService.dismissLoading()
        this.UserService.presentAlert(res['errormsg'])
      }
    
    },err =>{
      this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
    })
  }
  add(){
    this.UserService.showLoader()
    const option ={
      token:this.user.token,
      card_code:this.giftcard,
      amount:this.amountofcard
    }
    this.UserService.sendData('addGiftCardBalance',option).subscribe(res =>{
    this.UserService.dismissLoading()
    this.navCtrl.navigateForward('tabs/mywallet')
    },err =>{
      this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
    })
  }
}
