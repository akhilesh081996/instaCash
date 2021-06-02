import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;
  user: any;

  constructor(
    private userService: UserService,
    public navCtrl:NavController,
    public Storage:Storage,
  ) {
    this.contactForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      message: new FormControl("", Validators.required),
    });
   }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.Storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
      }
      
    }, err => {
      this.navCtrl.navigateForward(['/login']);
    });
  }
  back(){
    this.navCtrl.back();
  }
  submit(data){
    data['token'] = this.user.token
    this.userService.showLoader()
    this.userService.sendData('contact_us',data).subscribe(res=>{
      this.contactForm.reset();
      this.userService.presentToast("Successfully submitted!");
      this.userService.dismissLoading();
    },error=>{
      this.userService.presentToast("Not able to submit right now. Please try after some time!");
      this.userService.dismissLoading();
    });
  }
}
