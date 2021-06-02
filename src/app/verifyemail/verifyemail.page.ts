import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.page.html',
  styleUrls: ['./verifyemail.page.scss'],
})
export class VerifyemailPage implements OnInit {
  otp = 0;
  o1;
  o2;
  o3;
  o4;
  info: any;
  id: any;
  constructor(
    public route: ActivatedRoute,
    public userService: UserService,
    public navCtrl:NavController,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.id = JSON.parse(params.id)
        this.info = JSON.parse(params.info)
      }
    })
   }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  submit(){
    this.userService.showLoader();
    if(this.id){
      var params = {
        user_id:this.id,
        otp: this.o1
      }
      this.userService.sendData('verify_otp',params).subscribe(res=>{
        if(res){
          this.userService.dismissLoading()
          this.userService.presentToast("Your email is verified now.You can Sign in!")
          this.navCtrl.navigateForward('login')
        }
      },error=>{
          this.userService.dismissLoading();
          this.userService.presentToast("Not able to submit right now. Please try after some time!");
      });
    }
    
  }
}
