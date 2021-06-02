import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  passwordType = "password";
  termuse
  privacy
  constructor(
    public navCtrl:NavController,
    public userService: UserService,
  ) {
    this.registerForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    })
   }

  ngOnInit() {
  }
  goto(url){
    this.navCtrl.navigateForward(url)
  }
  termcon(ev){
    let check = ev.target.checked
    if(check ==  false){
      this.termuse = true
    }else{
      this.termuse = false
    }
  }
  privacypol(ev){
    let check = ev.target.checked
    if(check ==  false){
      this.privacy = true
    }else{
      this.privacy = false
    }
  }
  openVerify(){
    this.userService.showLoader()
    this.userService.sendData('register',this.registerForm.value).subscribe(res=>{
      if(res['status'] == "ok"){
        this.userService.dismissLoading()
        let navigationExtras: NavigationExtras = {
          queryParams: {
            info: JSON.stringify(this.registerForm.value),
            id: JSON.stringify(res['user_id']),
            fromMy: true
          }
        };
        this.navCtrl.navigateForward(['/verifyemail'], navigationExtras);
      }else{
        this.userService.presentToast("Not able to sign up right now. Please try after some time!");
        this.userService.dismissLoading();
      }
    },err =>{
      this.userService.presentToast(err.error.errormsg);
        this.userService.dismissLoading();
    })
    
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }
}
