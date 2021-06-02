import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-accpetmoneysend',
  templateUrl: './accpetmoneysend.page.html',
  styleUrls: ['./accpetmoneysend.page.scss'],
})
export class AccpetmoneysendPage implements OnInit {
  user: any;
  cardtok = undefined

  reciverData: any;
  result;
  cards;
  card_1;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public UserService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.secondUser) {
        this.reciverData = JSON.parse(params.secondUser)
      }
    });
   }
back(){
  this.navCtrl.back()
}
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
        this.getcard()
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  pay(){
    if(this.cardtok == undefined){
  this.UserService.presentAlert('Please select card')
    }else{
 this.pay1()
    }
  }
  pay1(){
    this.UserService.showLoader()
    const opton ={
      token:this.user.token,
      amount:this.reciverData.amount,
      receiver:this.reciverData.reciverid,
      card_id:this.cardtok
    }
    const opton2 ={
      token:this.user.token,
      amount:this.reciverData.amount,
      receiver:this.reciverData.requestorid,
    }
    this.UserService.sendData('sendMoneyFromWallet',opton2).subscribe(res =>{
      this.updatereq()
    },err =>{
      this.UserService.dismissLoading()
    })
  }
  updatereq(){
    const option ={
      token:this.user.token,
      status:'accept',
      request_id:this.reciverData.request_id,
      receiver:this.reciverData.requestorid
    }
    this.UserService.sendData('requestStatusUpdate',option).subscribe(res =>{
      this.UserService.dismissLoading()
      this.navCtrl.navigateForward(['success'])
    },err =>{
      this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
    })
  }
  selectcard(ev){
    this.cardtok = ev.detail.value
  }
  getcard(){
    this.storage.get('carddetail').then(res =>{
      this.cards = res
    })
  }
}
