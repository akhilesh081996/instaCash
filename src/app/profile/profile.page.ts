import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  bankaccount
  slideOpts = {
    slidesPerView: 1.1,
    spaceBetween: 10 
  };
  showTable= false
  user: any;
  userprofile;
  discoverable = false
  auto_send_transaction = false
  show_balance_information = false
  result: any;
  cards: any;
  availablebalnc= 0;
  number:any = 0;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public UserService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    public event:EventService,
    public action :ActionSheetController
  ) {
    this.UserService.showLoader()
   }

  ngOnInit() {

    this.event.getEvent().subscribe(res =>{
      if(res['event'] == "fetch_card")
      this.getcard()
    })
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.getProfile();
          this.getcard()
          this.getTranHist()
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  addkycmsg(){
    this.presentAlert('For send money You neeed to add KYC first. Please add KYC!')
  }
  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      message: msg,
      buttons: [{
        text: 'Later',
        handler: () => {
        }
      },
      {
        text: 'Setup Now',
        handler: () => {
          this.navCtrl.navigateForward('cardkyc')
        }
      }]
    });

    await alert.present();
  }
  getcard(){
    this.UserService.getData('StripeGetCards?token='+this.user.token).subscribe(res =>{
      if(res){
        this.result = res
        this.cards = this.result.cards.data;
        this.bankaccount = this.result.bank_accounts.data;
        this.storage.set('carddetail',this.cards)
        this.storage.set('bankdetail',this.bankaccount)

      }else{
      this.UserService.presentAlert("Something went Wrong")
      }
    },err =>{
      if(err.error.errormsg =='Not any resources found.'){
        this.cards.length = 0
      }else{
        this.UserService.presentAlert("Something went Wrong")
      }
    })
  }
  getProfile(){
    this.UserService.getData('getProfile?token='+this.user.token).subscribe(res =>{
      if(res){
    this.UserService.dismissLoading()
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
    this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
      }
    },err =>{
    this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
    })
  }
  changevalue(){
    const option ={
      discoverable:this.discoverable,
      auto_send_transaction:this.auto_send_transaction,
      show_balance_information:this.show_balance_information
    }
    const option2 ={
      key:option,
      token:this.user.token
    }
    this.UserService.sendData('updateUserInfo',option2).subscribe(res =>{

    })
  }
  async chooseOption(){
    const actionSheet = await this.action.create({
      buttons: [{
        text: 'Add Card',
        handler: () => {
          this.navCtrl.navigateForward('creditcard')
        }
      },
      {
        text: 'Add Bank Account',
        handler: () => {
          this.navCtrl.navigateForward('addbank')
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

  async add(){
    if(Number(this.number) == 0 || Number(this.number) == undefined){
      this.UserService.presentAlert('Please enter amount more than 0')
          }else{
    this.showTable = false
    const actionSheet = await this.action.create({
      header: "Select source",
      buttons: [{
        text: 'Load Wallet',
        handler: () => {
          this.router.navigate(['/loadwallet',Number(this.number)])
        }
      },
      {
        text: 'Use Gift Card',
        handler: () => {
          this.navCtrl.navigateForward('applygiftcard')
        }
      },
      {
        text: 'Deposit to Bank',
        handler: () => {
          if(Number(this.availablebalnc) < Number(this.number)){
            this.UserService.presentAlert('Please add more money to deposit to bank')

          }else{
            this.router.navigate(['/transfertobank',Number(this.number)])
          }
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
  }
  showTablefn(){
    this.number = 0
    this.showTable = true
  }
  hideTablefn(){
    this.showTable = false
  }
  async presentAlertInput() {
    let alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'Amount',
          placeholder: 'Amount',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Next',
          handler: data => {
            this.number = data.Amount;
            this.add()
          }
        }
      ]
    });
    await alert.present();
  }
  getTranHist(){
    this.UserService.getData('transactionHistory?token='+this.user.token+'&page_no=1').subscribe(res =>{
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
    if(Number(this.number) == undefined || Number(this.number) == 0){
      this.number =  val
    }else{
      this.number = this.number + val
    }
  }
  cut(){
    this.number = this.number.substring(0, this.number.length - 1);
  }
  async deleteAlert(data,i){
    let alert = await this.alertCtrl.create({
      message: 'Are you sure to delete card?',
      buttons: [{
        text: 'No',
        handler: () => {
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.cards.splice(i,1)
          this.deletecard(data)
        }
      }]
    });
    await alert.present();
  }
  deletecard(data){
    const option ={
      token:this.user.token,
      card:data.id,
      type:'forpayment'
    }
    this.UserService.sendData('delete_card',option).subscribe(res=>{
      this.getcard()
    },err =>{
        this.UserService.presentAlert("Something went Wrong")
    })

  }
}
