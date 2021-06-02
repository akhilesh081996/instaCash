import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-qruser',
  templateUrl: './qruser.page.html',
  styleUrls: ['./qruser.page.scss'],
})
export class QruserPage implements OnInit {
  number
  user: any;
  alluser
  id
  cardid
  userid
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
   
  }
  back(){
    this.navCtrl.back()
  }

  pay(){
    if(this.alluser == false){

    }else{
      var audio = new Audio('assets/moneycont.wav');
      audio.play()
      this.UserService.showLoader()
      const opton ={
        token:this.user.token,
        amount:this.number,
        receiver:Number(this.userid),
      }
      this.UserService.sendData('sendMoneyFromWallet',opton).subscribe(res =>{
        audio.pause()
        this.UserService.dismissLoading()
        let navigationExtras: NavigationExtras ={
          queryParams:{
            message:'You have paid $'+ this.number + ' sucessfully'
          }
        }
        this.navCtrl.navigateForward('success', navigationExtras)
      },err =>{
        this.UserService.dismissLoading()
      })
    }

  }

  ionViewWillEnter(){
    this.cardid = this.activatedRoute.snapshot.parent.paramMap.get('cardid');
    this.userid = this.activatedRoute.snapshot.parent.paramMap.get('userid');
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.getuser();
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  getuser(){
    this.UserService.showLoader()
    this.UserService.getData('getuserdata?token='+this.user.token+'&userid='+this.userid).subscribe(res =>{
      if(res['profile_data'] != false){
     this.UserService.dismissLoading()
        this.alluser =res['profile_data']
      }else{
     this.UserService.dismissLoading()
      this.UserService.presentAlert("User not found please rescan")
      }
    },err =>{
    this.UserService.dismissLoading()
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.UserService.presentAlert("Something went Wrong")
      }
    })
  }

}
