import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController} from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mycreatedevent',
  templateUrl: './mycreatedevent.page.html',
  styleUrls: ['./mycreatedevent.page.scss'],
})
export class MycreatedeventPage implements OnInit {

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
  getAllevent(){
    this.userService.getData('userEventsList?token='+this.user.token).subscribe(res =>{
      if(res){
        this.result = res['events']
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
  favratepost(id){
    this.result.map(ele=>{
      if(ele.event_id == id){
          ele.favpost = 1;
      }
    })
    const option ={
      token:this.user.token,
      post_id:id,
      fav: 1
    }
    this.userService.sendData('addToFavourites',option).subscribe(res =>{
      if(res['status'] == 'ok'){
      }else{
    this.userService.dismissLoading()
      this.userService.presentAlert("Something went wrong")
      }
    },err =>{
    this.userService.dismissLoading()
      this.userService.presentAlert("Something went wrong")
    })
  }
  unfavratepost(id){
    this.result.map(ele=>{
      if(ele.event_id == id){
          ele.favpost = 0;
      }
    })
    const option ={
      token:this.user.token,
      post_id:id,
      fav: 0
    }
    this.userService.sendData('addToFavourites',option).subscribe(res =>{
      if(res['status'] == 'ok'){
      }else{
        this.userService.dismissLoading()
      this.userService.presentAlert("Something went wrong")
      }
    },err =>{
      this.userService.dismissLoading()
      this.userService.presentAlert("Something went wrong")
    })
  }
delete(data,i){
  this.result.splice(i,1)
  const option ={
    event_id:data.event_id,
    token:this.user.token
  }
  this.userService.sendData('deleteEvent',option).subscribe(res =>{

  },err =>{
    this.userService.presentAlert('Something went wrong')
    this.getAllevent()
  })
}
}
