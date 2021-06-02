import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.page.html',
  styleUrls: ['./createevent.page.scss'],
})
export class CreateeventPage implements OnInit {
  divfirst =true
  divthird = false
  divsec = false
  user
  createEvent: FormGroup;
  mediaArray = []
  minDate 
  constructor(
    private userService: UserService,
    public navCtrl:NavController,
    public Storage:Storage,
  ) {
    this.createEvent = new FormGroup({
      title: new FormControl("", Validators.required),
      event_date: new FormControl("", Validators.required),
      from_time: new FormControl("", Validators.required),
      to_time: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      address_street1: new FormControl("", Validators.required),
      address_street2: new FormControl(""),
      city: new FormControl("", Validators.required),
      zip: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      duration: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
    });
   }
   ionViewWillEnter(){
    this.Storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        const tempd = new Date()
        this.minDate = tempd.getFullYear()
      }
      
    }, err => {
      this.navCtrl.navigateForward(['/login']);
    });
  }
  back(){
    this.navCtrl.back()
  }
  ngOnInit() {
  }
  secstep(){
    this.divfirst =false
    this.divsec = true
  }
  thirdstep(){
    this.divsec = false
    this.divthird = true
  }
  addimage(){
    document.getElementById('myfile').click()
  }
  media_preview(event){
    this.userService.showLoader()
    for (let i = 0; i < event.target.files.length; i++) {
      let formvalue = new FormData();
      formvalue.append('file', event.target.files[i])
      formvalue.append('token', this.user.token)
      this.userService.sendMedia('addFeaturedImage', formvalue, this.user.token).subscribe(
        result => {
          let rs: any = [];
          rs = result;
          this.mediaArray.push( {
            'upload_preview' : rs.upload_preview,
          });
          this.userService.dismissLoading();
      },err =>{
        this.userService.dismissLoading();
        this.userService.presentAlert('Something went wrong')

      });
    }
  }
  submit(data){
    this.userService.showLoader()
    data['media']= this.mediaArray,
    data['token'] = this.user.token
    this.userService.sendData('createEvent',data).subscribe(res =>{
if(res['status'] == 'ok'){
  this.userService.dismissLoading()

  this.createEvent.reset()
  this.navCtrl.navigateForward('tabs/mywallet')

}else{
  this.userService.dismissLoading()
  this.userService.presentAlert('Something went wrong')
}
    },err =>{
      this.userService.dismissLoading()
      this.userService.presentAlert('Something went wrong')

    })
  }
  
}
