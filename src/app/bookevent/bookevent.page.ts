import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.page.html',
  styleUrls: ['./bookevent.page.scss'],
})
export class BookeventPage implements OnInit {
  type = 'wallet'
  cardform: FormGroup;
  availablebalnc = 0
  number;
  result;
  cards: any;
  card_1: any;
  user: any;
  id
  cardtok = undefined
  cardshow = false
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
    this.id = this.activatedRoute.snapshot.parent.paramMap.get('id');
    this.number = this.activatedRoute.snapshot.parent.paramMap.get('number');

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
          this.pay1()
        }
  }else{
    if(this.number == undefined){
      this.UserService.presentAlert('Please enter amount')
    }else if(this.availablebalnc == 0 ){
      this.UserService.presentAlert('Please select card')
    }else{
      this.pay1()
    }
  }
}
pay1(){
  this.UserService.showLoader()
  const option ={
    token:this.user.token,
    type:this.type,
    amount:this.number,
    event_id:this.id,
    card_id:this.cardtok
  }
  this.UserService.sendData('bookEvent',option).subscribe(res =>{
    if(res['status'] == 'ok'){
      this.UserService.dismissLoading()
      this.navCtrl.navigateForward('tabs/mywallet')
      this.UserService.presentAlert('Event has been booked! Thanks')
    }else{
      this.UserService.dismissLoading()
    this.UserService.presentAlert('Something went Wrong')
    }

  },err =>{
    this.UserService.dismissLoading()
    this.UserService.presentAlert('Something went Wrong')
  })
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
getcard(){
this.storage.get('carddetail').then(res =>{
  this.cards = res
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
      this.UserService.dismissLoading()
    })
  }
}
selectadio(val){
  if(val == 'card'){
    this.type = 'card'
    this.cardshow = true
  }else{
    if(this.availablebalnc == 0){
      this.UserService.presentAlert("Wallet amount is low Please select card.")
      return
    }else{
      this.cardshow = false
    }
  }
}

}
