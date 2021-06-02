import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController} from '@ionic/angular';
import { UserService } from '../user.service';
import { Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-livestreamevent',
  templateUrl: './livestreamevent.page.html',
  styleUrls: ['./livestreamevent.page.scss'],
})
export class LivestreameventPage implements OnInit {

  user
  result
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
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.getAllevent();
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  watch(data){
    let navigationExtras:NavigationExtras = {
      queryParams: {
        data:JSON.stringify(data)
      }
    }
    this.navCtrl.navigateForward(['/streamingscreen'],navigationExtras)
  }
  getAllevent(){
    this.userService.showLoader()
    this.userService.getData('user_s_live_events?token='+this.user.token).subscribe(res =>{
    this.userService.dismissLoading()
      if(res['list']){
        this.result = res['list']
      }else{
        this.userService.presentAlert("currently no live stream")
      }
    },err =>{
    this.userService.dismissLoading()
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.userService.presentAlert("Something went Wrong")
      }
    })
  }
}
