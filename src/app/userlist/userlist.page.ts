import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {
  number
  user: any;
  alluser
  id = undefined
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
    public action :ActionSheetController,
    private activatedRoute: ActivatedRoute,
    public event:EventService

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

  async popup(){
    const actionSheet = await this.action.create({
      header: "Select source",
      buttons: [{
        text: 'yes',
        handler: () => {
          this.pay()
         }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  play(){
       
  }
  pay(){
    if(this.id == undefined){
this.UserService.presentAlert("Please select user which you want send money")
    }else{
      if(this.cardid == 'null'){
        this.UserService.showLoader()
        const opton ={
          token:this.user.token,
    amount:this.number,
    receiver:this.id,
        }
        var audio = new Audio('assets/moneycont.wav');
        audio.play()
        this.UserService.sendData('sendMoneyFromWallet',opton).subscribe(res =>{
          if(res['status'] == 'ok'){
            audio.pause()
            this.event.publishEvent({event:'update_bal'})
            this.UserService.dismissLoading()

            let navigationExtras : NavigationExtras = {
              queryParams :{
                message: 'You have send $'+ this.number+ ' Sucessfully'
              }
            }

            this.navCtrl.navigateForward('success', navigationExtras)
          }else{
            this.UserService.dismissLoading()
            this.UserService.presentAlert(res['msg'])
          }
        },err =>{
          this.UserService.dismissLoading()
        })
      }else{
        var audio = new Audio('assets/moneycont.wav');
        audio.play()
        this.UserService.showLoader()
        const opton ={
          token:this.user.token,
    amount:this.number,
    receiver:this.id,
    card_id:this.cardid
        }
        this.UserService.sendData('transferMoney',opton).subscribe(res =>{
          audio.pause()
          this.event.publishEvent({event:'update_bal'})


          this.UserService.dismissLoading()
          this.navCtrl.navigateForward('success')
        },err =>{
          this.UserService.dismissLoading()
        })
      }

    }

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
