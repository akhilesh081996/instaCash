import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Platform,NavController,MenuController,ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal/ngx/index';
import { Router, NavigationExtras } from '@angular/router';
import { SplashPage } from './splash/splash.page';
import { EventService } from './event.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  readerMode$
  appPages: { title: string; url: string; icon: string; }[];
  type: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public NavController:NavController,
    public storage :Storage,
    public menu:MenuController,
    private oneSignal: OneSignal,
    private router: Router,
    public model:ModalController,
    public userService: UserService,
    public event:EventService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      this.storage.get('user').then(userInfo => {
        if (userInfo!=null) {
            this.NavController.navigateForward(['tabs/mywallet'])
        } else {
          if( localStorage.getItem('firstTimeLoad') != 'TRUE' ){
            localStorage.setItem('firstTimeLoad', 'TRUE');
              this.NavController.navigateForward(['/welcome'])
            }else{
            this.NavController.navigateForward(['/home'])
            }
        }
      })
      this.oneSignal.startInit('d31514a2-d62d-490d-ad8c-74e0c51bbfeb')
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data =>{
        this.onPushReceived()
      })
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload))
      this.oneSignal.endInit();
    });
    
  }
  async opensplash(){
const models = this.model.create({
  component:SplashPage
})
return (await models).present()
  }
  logout(){
    // this.userService.showLoader()
    this.storage.get('user').then((val) => {
      if(this.platform.is('android')){
        this.type ='android'
      }else{
        this.type ='ios'
      }
      localStorage.clear()
      this.storage.clear()
      this.NavController.navigateForward('home')
      this.oneSignal.getIds().then((id) => {
        const option ={
          device_token:id.userId,
          token:val.token,
          device_type:this.type
        }
        this.userService.sendData('deleteTokenOnLogut',option).subscribe(res =>{
          this.userService.dismissLoading()
          this.storage.clear()
          localStorage.clear()
          this.NavController.navigateForward('home')
        },err =>{
          this.userService.dismissLoading()
        }) 
       });

  },err=>{
    localStorage.clear()
    this.storage.clear();
    this.router.navigate(['/login']);
  })

  }
  
  private onPushReceived() {
    this.event.publishEvent({event:'update_bal'})
    
  }
  private onPushOpened(payload: OSNotificationPayload) {

    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
    this.event.publishEvent({event:'update_bal'})

        let event_notification = payload.additionalData;
        if (event_notification.type == "money_request") {
          this.openreq(event_notification.data_noti)
        }
        if (event_notification.type == "money_received") {
         this.NavController.navigateForward('tabs/mywallet')
        }
        if (event_notification.type == "broadcast") {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              session_id: event_notification.session_id,
              url: event_notification.broadcast_url.hls,
              broadcast_id: event_notification.id,
              sender: 'sender',
              broad_type:'listen'
            },
          };
          this.router.navigate(["/broadcast"], navigationExtras);
        }
      } else {
        this.storage.clear()
        this.router.navigate(['/home']);
      }
    }, error => {
      this.storage.clear()
      this.router.navigate(['/home']);
    });
  }
  openreq(userProfile) {
   const option ={
     userpic:userProfile.user_avatar,
     name:userProfile.name,
     request_id:userProfile.request_id,
     amount:userProfile.amount,
     reciverid:userProfile.receiver_id,
     requestorid:userProfile.requestorid
   }
   let navigationExtras: NavigationExtras = {
    queryParams: {
      secondUser: JSON.stringify(option),
    }
  }
  this.NavController.navigateForward(['/acceptrej'], navigationExtras);
  }
}
