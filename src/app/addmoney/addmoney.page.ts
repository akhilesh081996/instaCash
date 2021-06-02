import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addmoney',
  templateUrl: './addmoney.page.html',
  styleUrls: ['./addmoney.page.scss'],
})
export class AddmoneyPage implements OnInit {
  cardform: FormGroup;
  availablebalnc = 0
  number;
  result;
  cards: any;
  card_1: any;
  user: any;
  type
  cardtok = undefined
  cardshow = false
  banktrue = false
  banktok
  bankdetail
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
    this.type = this.activatedRoute.snapshot.parent.paramMap.get('type');
  }
  back(){
    this.navCtrl.back()
  }
  cut(){
    this.number = this.number.substring(0, this.number.length - 1);
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
        this.getTranHist()
          this.getcard()
          this.getbank()
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
    this.cardform = new FormGroup({
      'cardid': new FormControl('', Validators.compose([
        Validators.required
      ])),
    })
  }
  getTranHist(){
    this.UserService.getData('transactionHistory?token='+this.user.token).subscribe(res =>{
      if(res){
        this.availablebalnc = res['wallet_balance']
      }else{
      this.UserService.presentAlert("Something went Wrong")
      }
    },err =>{
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.UserService.presentAlert("Something went Wrong")
      }
    })
  }
addmoney(val){
  if(this.number == undefined){
    this.number =  val
  }else{
    this.number = this.number + val
  }
}
pay(){
  if(this.cardshow == true){
    if(this.cardtok == undefined){
      this.UserService.presentAlert('Please select card')
        }else if(this.number == undefined){
          this.UserService.presentAlert('Please enter amount')
        }else{
          this.router.navigate(['/sendmoney2',this.number,this.cardtok])
        }
  }else{
    if(this.number == undefined){
      this.UserService.presentAlert('Please enter amount')
    }else if(this.availablebalnc == 0 ){
      this.UserService.presentAlert('Please select card')
    }else{
      this.router.navigate(['/sendmoney2',this.number,'null'])
    }
  }

}
req(){
 if(this.number == undefined){
        this.UserService.presentAlert('Please enter amount')
      }else{
        this.router.navigate(['/reqmoneyuserlist',this.number])
      }
}
selectcard(ev){
  this.cardtok = ev.detail.value
}
selectbank(ev){
  this.banktok = ev.detail.value
}
getcard(){
this.storage.get('carddetail').then(res =>{
  this.cards = res
})
}
getbank(){
  this.storage.get('bankdetail').then(res =>{
    this.bankdetail = res
  })
  }
addwallet(){
  if(this.cardtok == undefined){
this.UserService.presentAlert('Please select card')
  }else if(this.number == undefined){
    this.UserService.presentAlert('Please enter amount')
  }else{
    this.UserService.showLoader()
    const opton ={
      token:this.user.token,
      amount:this.number,
      card_id:this.cardtok
    }
    this.UserService.sendData('addwallet',opton).subscribe(res =>{
this.navCtrl.navigateForward('tabs/profile')   
   this.UserService.dismissLoading()

    },err =>{
      this.UserService.presentAlert(err.error.msg)
      this.UserService.dismissLoading()
    })
  }
}
addwallet1(){
  if(this.banktok == undefined){
this.UserService.presentAlert('Please select bank')
  }else if(this.number == undefined){
    this.UserService.presentAlert('Please enter amount')
  }else{
    this.UserService.showLoader()
    const opton ={
      token:this.user.token,
      amount:this.number,
      bank_id:this.banktok
    }
    this.UserService.sendData('addWalletWithBank',opton).subscribe(res =>{
this.navCtrl.navigateForward('tabs/profile')   
   this.UserService.dismissLoading()

    },err =>{
      this.UserService.presentAlert(err.error.msg)
      this.UserService.dismissLoading()
    })
  }
}
selectadio(val){
  if(val == 'card'){
    this.cardshow = true
    this.banktrue  =false
  }else if(val == 'bank'){
    this.cardshow = false
    this.banktrue  =true
  }else{
    this.cardshow = false
    this.banktrue  = false

  }
}
}
