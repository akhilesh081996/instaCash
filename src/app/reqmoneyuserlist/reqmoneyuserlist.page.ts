import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-reqmoneyuserlist',
  templateUrl: './reqmoneyuserlist.page.html',
  styleUrls: ['./reqmoneyuserlist.page.scss'],
})
export class ReqmoneyuserlistPage implements OnInit {
  number
  user: any;
  alluser
  id
  cardid
  ready = false
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
    this.number = this.activatedRoute.snapshot.parent.paramMap.get('number');
    this.cardid = this.activatedRoute.snapshot.parent.paramMap.get('cardid');
   }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  checkuser(id){
    this.id = id
  }
  pay(){
    this.UserService.showLoader()
    const opton ={
      token:this.user.token,
  amount:this.number,
  receiver:this.id,
    }
    this.UserService.sendData('requestMoney',opton).subscribe(res =>{
      this.UserService.dismissLoading()
      let navigationExtras : NavigationExtras ={
        queryParams:{
          message: 'Your request of $'+this.number +' is pending'
        }
      }
      this.navCtrl.navigateForward('pending', navigationExtras)

    },err =>{
      this.UserService.dismissLoading()
    })
  }

  ionViewWillEnter(){
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
    this.UserService.getData('getAllUser?token='+this.user.token).subscribe(res =>{
      if(res){
        this.ready = true
        this.alluser =res['user']
      }else{
        this.ready = true
      this.UserService.presentAlert("Something went Wrong")
      }
    },err =>{
      this.ready = true
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.UserService.presentAlert("Something went Wrong")
      }
    })
  }
  search(val){
    this.ready = false
    this.id = undefined
    setTimeout(() => {
      this.UserService.getData('searchUsers/?token='+this.user.token+'&search_text='+val.target.value).subscribe(res =>{
        if(res){
          this.ready = true
          this.alluser =res['user']
        }else{
          this.ready = true
        this.UserService.presentAlert("Something went Wrong")
        }
      },err=>{
        this.ready = true
        if(err.error.errormsg =='Not any resources found.'){
        }else{
          this.UserService.presentAlert("Something went Wrong")
        }
      })
    }, 200);
    
  }

}
