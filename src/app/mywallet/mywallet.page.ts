import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController} from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mywallet',
  templateUrl: './mywallet.page.html',
  styleUrls: ['./mywallet.page.scss'],
})
export class MywalletPage implements OnInit {
  slideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10 
  };
  bankaccount
  availablebalnc =0
  page:number=1;
  user: any;
  userprofile;
  discoverable = false
  auto_send_transaction = false
  show_balance_information = false
  result: any;
  cards: any;
  card_1: any;
  transactions
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    public action :ActionSheetController

  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
        this.user = val;
          this.getProfile();
          this.getcard()
          this.getTranHist()
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    })
  }
  reload(){
    this.getProfile();
    this.getcard()
    this.getTranHist()
  }
  async revi(){
    const actionSheet = await this.action.create({
      header: "Select source",
      buttons: [{
        text: 'Receive money by user request',
        handler: () => {
          this.router.navigate(['/addmoney/req'])
        }
      },
      {
        text: 'Receive money by qr code',
        handler: () => {
          this.navCtrl.navigateForward('qrcode')
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  getcard(){
    this.userService.getData('StripeGetCards?token='+this.user.token).subscribe(res =>{
      if(res){
        this.result = res
        this.cards = this.result.cards.data;
        this.bankaccount = this.result.bank_accounts.data;
        this.storage.set('carddetail',this.cards)
        this.storage.set('bankdetail',this.bankaccount)

        this.card_1 = this.cards[0]
      }else{
      this.userService.presentAlert("Something went Wrong")
      }
    },err =>{
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.userService.presentAlert("Something went Wrong")
      }
    })
  }
  getTranHist(){
    this.userService.getData('transactionHistory?token='+this.user.token+'&page_no='+this.page).subscribe(res =>{
      if(res){
        this.availablebalnc = res['wallet_balance']
        this.transactions = res['transactions']
      }else{
      this.userService.presentAlert("Something went Wrong")

      }
    },err =>{
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.userService.presentAlert("Something went Wrong")
      }
    })
  }
  getProfile(){
    this.userService.getData('getProfile?token='+this.user.token).subscribe(res =>{
      if(res){
        this.userprofile = res
        if(this.userprofile.setting.auto_send_transaction ==true){
         this.auto_send_transaction = true
        }else{
          this.auto_send_transaction = false
        }
        if(this.userprofile.setting.discoverable ==true){
          this.discoverable = true
         }else{
           this.discoverable = false
         }
         if(this.userprofile.setting.show_balance_information == true){
          this.show_balance_information = true
         }else{
           this.show_balance_information = false
         }
      }else{
      this.userService.presentAlert('Something went wrong')
      }

    },err =>{
      this.userService.presentAlert('Something went wrong')
    })

  }
  loadMore(event) {
    this.page++;
    this.userService.getData('transactionHistory?token='+this.user.token+'&page_no='+this.page).subscribe(res =>{
      if(res['status'] == 'ok'){
        event.target.complete();
        if(res['transactions'] != []){
          this.transactions = [...this.transactions, ...res['transactions']];
        }else{
          this.page--;
        }
      }else{
        this.userService.presentAlert("Something went wrong")
        event.target.complete();
      }
    },err =>{
      this.page--;
      event.target.complete();
      this.userService.dismissLoading()
    this.userService.presentAlert('Something went Wrong')
    })
  }
}
