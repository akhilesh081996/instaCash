import { Component, OnInit ,NgZone} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../event.service';
@Component({
  selector: 'app-acceptrej',
  templateUrl: './acceptrej.page.html',
  styleUrls: ['./acceptrej.page.scss'],
})
export class AcceptrejPage implements OnInit {
  userid
  user: any;
  number;
  request_id
  reciverData: any;
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
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.secondUser) {
        this.reciverData = JSON.parse(params.secondUser)
      }else{
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
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  accprej(status){
    if(status == 'accept'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          secondUser: JSON.stringify(this.reciverData),
        }
      }
      this.pay1(this.reciverData)
    }else{
      this.UserService.showLoader()
      const option ={
        token:this.user.token,
        status:status,
        request_id:this.reciverData.request_id,
        receiver:this.reciverData.requestorid,
        amount:this.reciverData.amount,
      }
      this.UserService.sendData('requestStatusUpdate',option).subscribe(res =>{
        this.UserService.dismissLoading()
        this.navCtrl.navigateForward(['tabs/mywallet'])
      },err =>{
        this.UserService.dismissLoading()
        this.UserService.presentAlert('Something went wrong')
      })
    }
  }
  pay1(data){
    this.UserService.showLoader()
    const opton ={
      token:this.user.token,
      amount:this.reciverData.amount,
      receiver:this.reciverData.reciverid,
    }
    const opton2 ={
      token:this.user.token,
      amount:this.reciverData.amount,
      receiver:this.reciverData.requestorid,
    }
    this.UserService.sendData('sendMoneyFromWallet',opton2).subscribe(res =>{
      this.updatereq()
    this.event.publishEvent({event:'update_bal'})
    },err =>{
      this.UserService.dismissLoading()
    })
  }
  updatereq(){
    const option ={
      token:this.user.token,
      status:'accept',
      request_id:this.reciverData.request_id,
      receiver:this.reciverData.requestorid,
      amount:this.reciverData.amount,
    }
    this.UserService.sendData('requestStatusUpdate',option).subscribe(res =>{
      this.UserService.dismissLoading()
      this.event.publishEvent({event:'update_bal'})
      this.navCtrl.navigateForward(['success'])
    },err =>{
      this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
    })
  }
}
