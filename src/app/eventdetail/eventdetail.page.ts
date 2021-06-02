import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController} from '@ionic/angular';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.page.html',
  styleUrls: ['./eventdetail.page.scss'],
})
export class EventdetailPage implements OnInit {

  id
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
    public action :ActionSheetController,
    private activatedRoute: ActivatedRoute,

  ) {
    this.userService.showLoader()
   }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.id = this.activatedRoute.snapshot.parent.paramMap.get('id');

    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.getSingle();
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  getSingle(){
    this.userService.getData('getSingleEventById?token='+this.user.token+'&event_id='+this.id).subscribe(res =>{
      if(res){
    this.userService.dismissLoading()
        this.result = res['events']
      }else{
    this.userService.dismissLoading()

      this.userService.presentAlert("Something went Wrong")
      }
    },err =>{
    this.userService.dismissLoading()

      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.userService.presentAlert("Something went Wrong")
      }
    })
  }
  bookevent(){
    const option ={
      token:this.user.token,
      event_id:this.id
    }
    
  }

}
