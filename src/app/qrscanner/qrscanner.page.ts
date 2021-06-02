import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController, IonSlides} from '@ionic/angular';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { TransactionhistoryPage } from '../transactionhistory/transactionhistory.page';
import { EventService } from '../event.service';
import * as QRCodeStyling from 'qr-code-styling'

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {
  barCodeValue;
  elementType = 'svg';
  value ='sadas'
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 60;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 16;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  padding = 20
  codeList: string[] = [
    '', 'CODE128',
    'CODE128A', 'CODE128B', 'CODE128C',
    'UPC', 'EAN8', 'EAN5', 'EAN2',
    'CODE39',
    'ITF14',
    'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
    'pharmacode',
    'codabar'
  ];

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;
  scanSub
  user: any;
  qrCode
  number
  bankaccount
  availablebalnc = 0
  page:number=1;
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
  scannerRunning;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public plt: Platform,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public router: Router,
    public action :ActionSheetController,
    public qrScanner: QRScanner,
    public event:EventService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,

  ) {
  

   }
   get values(): string[] {
    return this.value.split('\n');
  }
  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateBack('/tabs/mywallet')
    document.getElementById('body').style.clear
    document.getElementById('body').style.background = ''
    this.qrScanner.hide();
    if(this.scanSub){
        this.scanSub.unsubscribe();
    }
    this.qrScanner.destroy()
  }
  ionViewWillEnter(){
    document.getElementById('body').style.background = 'transparent'
    setTimeout(() => {
      this.scanQr()
    }, 500);
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
        this.barCodeValue = 'instacash.app '+this.user.user_id
        this.getqr(this.user.user_id)
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  getqr(user_id){
    this.qrCode = new QRCodeStyling({
      width: 215,
      height: 210,
      data: 'instacash.app '+String(user_id),
      image: "assets/images/insta-logo.jpg",
      dotsOptions: {
        color: "#000",
        type: "dots",
      },
      cornersSquareOptions:{
        color: "#fff",
        type: "square"
      },
      cornersDotOptions:{
        color: "#fff",
        type: "square"
      },
      backgroundOptions: {
          color: "#fff",
      },
  });
  
  this.qrCode.append(document.getElementById("canvas"));
  
  }
  scanQr() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show()
          if(this.segment==0){
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            if(text.match('instacash.app')){
              var newText = text.replace("instacash.app ", "")
              if(newText){
                document.getElementById('body').style.clear
                document.getElementById('body').style.background = ''
                this.qrScanner.hide(); 
                this.scanSub.unsubscribe(); 
                this.ngZone.run(() => 
                this.router.navigate(['/qruser','null',newText])
                )
              }else{
                this.userService.presentAlert('Something went wrong! Please try again')
                this.back()
              }
            }else{
              this.userService.presentAlert('User not found! Please try again')
              this.back()
            }
          })
        }
        } else if (status.denied) {
          this.qrScanner.openSettings();
        } else {
        }
      })
      .catch((e: any) =>{
      });
  }

  ionViewDidLeave() {
    document.getElementById('body').style.clear
    document.getElementById('body').style.background = ''
    if(this.scanSub){
    this.scanSub.unsubscribe()
    }
    this.qrScanner.hide(); 
    this.qrScanner.destroy()
    }
  async segmentChanged() {  
    await this.slider.slideTo(this.segment);  
  }  
  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
  } 
}
