import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController} from '@ionic/angular';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-event',
  templateUrl: './upcoming-event.page.html',
  styleUrls: ['./upcoming-event.page.scss'],
})
export class UpcomingEventPage implements OnInit {
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

  ) { }

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
    this.userService.getData('getEventById?token='+this.user.token+'&event_id='+this.id).subscribe(res =>{
      if(res){
        this.result = res['event']
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
  bookevent(){
    const option ={
      token:this.user.token,
      event_id:this.id
    }
    
  }
}
