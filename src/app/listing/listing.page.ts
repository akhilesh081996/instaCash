import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  user: any;
  listing
  id = undefined
  havelist = true
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
   }
   ngOnInit() {
     this.UserService.showLoader()
  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.getlist();
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  getlist(){
    const option ={
      token:this.user.token
    }
    this.UserService.sendData('moneyRequestListing',option).subscribe(res =>{
      if(res){
     this.UserService.dismissLoading()
        this.listing =res['listing']
        if(this.listing){
          this.havelist = true
        }else{
          this.havelist = false
        }
      }else{
     this.UserService.dismissLoading()

      this.UserService.presentAlert("Something went Wrong")
      }
    },err =>{
     this.UserService.dismissLoading()

      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.UserService.presentAlert("Something went Wrong")
      }
    })
  }
  accprej(status,data){
    if(status == 'accept'){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          secondUser: JSON.stringify(data),
        }
      }
      this.navCtrl.navigateForward(['/accpetmoneysend'], navigationExtras);
    }else{
      this.UserService.showLoader()
      const option ={
        token:this.user.token,
        status:status,
        request_id:data.request_id,
        requestorid:data.requestorid
      }
      this.UserService.sendData('requestStatusUpdate',option).subscribe(res =>{
        this.UserService.dismissLoading()
        this.getlist()
      },err =>{
        this.UserService.dismissLoading()
        this.UserService.presentAlert('Something went wrong')
      })
    }
  }
  openreq(userProfile) {
    const option ={
      userpic:userProfile.userpic,
      name:userProfile.name,
      request_id:userProfile.request_id,
      amount:userProfile.amount,
      reciverid:userProfile.reciverid,
      requestorid:userProfile.requestorid
    }
    let navigationExtras: NavigationExtras = {
     queryParams: {
       secondUser: JSON.stringify(option),
     }
   }
   this.navCtrl.navigateForward(['/acceptrej'], navigationExtras);
   }
   reload(){
     this.UserService.showLoader()
    this.getlist()
   }
}
