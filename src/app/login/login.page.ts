import { Component, OnInit } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  passwordType = "password";

  constructor(
    public userService: UserService,
    public navCtrl:NavController,
    public storage :Storage,
    public alertCtrl: AlertController,

  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
   }

  ngOnInit() {
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
  signIn(){
    this.userService.showLoader()
    this.userService.auth('token',this.loginForm.value).subscribe(res=>{
      if(res['token']){
     this.userService.SaveAutoConfiqure(res['token']);
        this.userService.dismissLoading()
        this.storage.set('user',res)
        if(res['user_create_profile_flag'] == "0"){
          this.navCtrl.navigateForward("createaccount")
        }else{
          if(res['kyc_status'] == '0'){
            this.presentAlert('Please setup your bank account information to send or receive money.')
            }
          this.navCtrl.navigateForward('tabs/mywallet')
        }
      }else{     
        this.userService.presentToast("login error!");
        this.userService.dismissLoading()
      }
    },error=>{
      this.userService.presentToast(error.error.message);
        this.userService.dismissLoading();
    });
  }
  async presentAlert(msg) {
    let alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Setup Now',
          handler: () => {
            this.navCtrl.navigateForward('cardkyc')
          }
        },
        {
        text: 'Later',
        handler: () => {
        }
      },
    ]
    });

    await alert.present();
  }
}
