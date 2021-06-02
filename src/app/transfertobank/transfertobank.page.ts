import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
@Component({
  selector: 'app-transfertobank',
  templateUrl: './transfertobank.page.html',
  styleUrls: ['./transfertobank.page.scss'],
})
export class TransfertobankPage implements OnInit {

  
  availablebalnc 
  number;
  result;
  cards: any;
  card_1: any;
  user: any;
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
    public event:EventService
  ) {
    this.number = this.activatedRoute.snapshot.parent.paramMap.get('number');
   }

  ngOnInit() {

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
          this.getbank()
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
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
selectbank(ev){
  this.banktok = ev.detail.value
}
getbank(){
  this.storage.get('bankdetail').then(res =>{
    this.bankdetail = res
  if(this.bankdetail == null){
    this.UserService.presentAlert('Please add bank account first')
  }
  })
  }
  send(){
    if(this.number > this.availablebalnc){
this.UserService.presentAlert("Please ennter lower amount than available balance")
    }else{
      var audio = new Audio('assets/moneycont.wav');
      audio.play()
      this.UserService.showLoader()
      const option ={
        bank_id:this.banktok,
        token:this.user.token,
        amount:this.number
      }
      this.UserService.sendData('walletToBank',option).subscribe(res =>{
   audio.pause()

        if(res['status']== 'ok'){
          this.navCtrl.navigateForward('tabs/profile')
          this.event.publishEvent({event:'update_bal'})
          this.UserService.dismissLoading()
          this.UserService.presentAlert('Funds successfully sent to Bank Account')

        }else{
        this.UserService.dismissLoading()
        this.UserService.presentAlert('Something went wrong')
        }
      },err =>{
        this.UserService.dismissLoading()
        this.UserService.presentAlert(err.error.msg)
      })

    }
  }

}
