import { Component, NgZone, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController ,NavParams} from '@ionic/angular';
import { UserService } from '../user.service';
import { NavigationExtras, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { TransactionhistoryPage } from '../transactionhistory/transactionhistory.page';
import { EventService } from '../event.service';
import { NFC } from '@ionic-native/nfc/ngx/index';

@Component({
  selector: 'app-walletnew',
  templateUrl: './walletnew.page.html',
  styleUrls: ['./walletnew.page.scss'],
})
export class WalletnewPage implements OnInit {
  scanSub
  number :String = '0'
  bankaccount
  availablebalnc = 0
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
  useridbyqr;
  cardid
  refresh: any;
  readerMode$: any;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    public action :ActionSheetController,
    public qrScanCtrl: QRScanner,
    public event:EventService,
    public nfc: NFC, 
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.event.getEvent().subscribe(res =>{
      if(res['event'] == "update_bal")
      this.page = 1
      this.getProfile();
      this.getcard()
      this.getTranHist()
      this.availablebalnc = 0
      this.number = '0'
    })
  }
  ionRefresh(ev){
    this.refresh = ev.target
      this.reload()
  }

  async checkNFC(){
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe( res =>
        tag => {
          console.log('JSON',tag)
          if(tag && tag.ndefMessage[0] && tag.ndefMessage[0].payload){
            let tagContent = this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(tag.ndefMessage[0].payload[0] +  1);
                if(tagContent.match('instacash.app')){
                  var newText = tagContent.replace("instacash.app ", "");
                  if(newText){
                    this.ngZone.run(() => 
                    this.router.navigate(['/qruser','null',newText])
                    );
                  }else{
                    this.userService.presentAlert('Something went wrong! Please try again');
                  }
                }else{
                  this.userService.presentAlert('Something went wrong! Please try again');
                }
          }
        },
        err => {
          this.userService.presentAlert(err);
        }
    );
    try {
        let tag = await this.nfc.scanNdef();
        if(tag && tag.ndefMessage[0] && tag.ndefMessage[0].payload){
              let tagContent = this.nfc.bytesToString(tag.ndefMessage[0].payload).substring(tag.ndefMessage[0].payload[0] +  1);
              if(tagContent.match('instacash.app')){
                var newText = tagContent.replace("instacash.app ", "");
                if(newText){
                  this.ngZone.run(() => 
                  this.router.navigate(['/qruser','null',newText])
                  );
                }else{
                  this.userService.presentAlert();
                }
              }else{
                this.userService.presentAlert();
              }
        }else{
          this.userService.presentAlert();
        }
    } catch (err) {
        if(err == 'NO_NFC'){
          this.userService.presentAlert('Your devices does not support NFC');
        }else{
          this.userService.presentAlert(err);
        }
    }
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
        this.user = val;
          this.getProfile();
          this.getcard();
          this.getTranHist();
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    })
    this.availablebalnc = 0;
    this.number = '0';
  }
  reload(){
    this.page = 1;
    this.userService.showLoader();
    this.getProfile();
    this.getcard();
    this.getTranHist();
    this.availablebalnc = 0;
    this.number = '0';
    setTimeout(() => {
      if(this.refresh){
        this.refresh.complete();
      }
    }, 1000);
  }
  async revi(){
    if(Number(this.number) == 0 || Number(this.number) == undefined){
this.userService.presentAlert('Please enter amount more than 0')
    }else{
      const actionSheet = await this.action.create({
        header: "Select source",
        buttons: [{
          text: 'From User',
          handler: () => {
            this.router.navigate(['/reqmoneyuserlist',Number(this.number)])
          }
        },
        {
          text: 'With QR Code',
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
   
  }
  async add(){
    if(Number(this.number) == 0 || Number(this.number) == undefined){
      this.userService.presentAlert('Please enter amount more than 0')
          }else{
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
            this.userService.presentAlert('Please add more money to deposit to bank')

          }else{
            this.router.navigate(['/transfertobank',this.number])
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
  
  async send(){
    if(Number(this.number) == 0 || Number(this.number) == undefined){
      this.userService.presentAlert('Please enter amount more than 0')
          }else if(Number(this.number) > Number(this.availablebalnc) ){
            this.userService.presentAlert('You have insufficient balance in wallet.')
                }else{
            const actionSheet = await this.action.create({
              header: "Select source",
              buttons: [{
                text: 'Send to user',
                handler: () => {
                  this.router.navigate(['/userlist',Number(this.number),'null'])
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
         this.userService.dismissLoading()
      }else{
        this.userService.dismissLoading()
      this.userService.presentAlert('Something went wrong')
      }
    },err =>{
      this.userService.dismissLoading()
      this.userService.presentAlert('Something went wrong')
    })

  }
  loadMore(event) {
    this.page++;
    this.userService.getData('transactionHistory?token='+this.user.token+'&page_no='+this.page).subscribe(res =>{
      if(res['status'] == 'ok'){
        event.target.complete();
        if(res['transactions'] != null){
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
  goToQrScan() {
    this.qrScanCtrl.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
let data = document.getElementById('qrcont')       
data.classList.add('show-qr-scanner')
          this.scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
            this.useridbyqr = text
            data.classList.remove('show-qr-scanner')
            if (this.useridbyqr !== '') {
              data.classList.remove('show-qr-scanner')
              this.closeScanner();
              this.scanSub.unsubscribe()
              this.router.navigate(['/qruser','null',this.useridbyqr])
            }
          });
          this.qrScanCtrl.show();
        } else if (status.denied) {
          this.qrScanCtrl.openSettings();
        } else {
        }
      })
      .catch((e: any) => {
      });
  }
  closeScanner() {
    this.qrScanCtrl.hide();
    this.qrScanCtrl.destroy();
  }
  addmoney(val){
    if(this.number.match(/\d\.\d/) && val == '.'){
      return
    }else{
      if(this.number == undefined || this.number == '0'){
        this.number =  val
      }else{
        this.number = this.number + val
      }
    }
  }
  cut(){
    this.number = this.number.substring(0, this.number.length - 1);
  }
  gotoHist(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        detail: JSON.stringify(data),
      }
    };
    this.navCtrl.navigateForward(['/historydetail'], navigationExtras);
  }
}
