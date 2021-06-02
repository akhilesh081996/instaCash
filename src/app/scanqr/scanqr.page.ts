import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController} from '@ionic/angular';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { TransactionhistoryPage } from '../transactionhistory/transactionhistory.page';
import { EventService } from '../event.service';
@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.page.html',
  styleUrls: ['./scanqr.page.scss'],
})
export class ScanqrPage implements OnInit {

  scanSub
  number
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
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    setTimeout(() => {
this.goToQrScan()
    }, 300);
  }
  goToQrScan() {
    this.qrScanCtrl.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
let data = document.getElementById('qrcontt')       
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
}
