import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UserService } from '../user.service';

@Component({
  selector: 'app-billingaddress',
  templateUrl: './billingaddress.page.html',
  styleUrls: ['./billingaddress.page.scss'],
})
export class BillingaddressPage implements OnInit {
  billingaddress: FormGroup;
  user: any;

  constructor(
    public nvctrl :NavController,
    public UserService: UserService,
    public storage: Storage,
  ) { }

  ngOnInit() {
    this.billingaddress = new FormGroup({
      'street1': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'street2': new FormControl(''),
      'city': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'zipcode': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'state': new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }
  ionViewWillEnter(){
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
      }
    }, err => {
      this.nvctrl.navigateForward(['/login']);
    });
  }
  submit(form){
    this.UserService.showLoader()
    form['token'] = this.user.token
    this.UserService.sendData('addBillingAddress',form).subscribe(res =>{
      if(res['status']  == 'ok'){
        this.UserService.dismissLoading()
        this.nvctrl.navigateForward('creditcard')
      }else{
        this.UserService.dismissLoading()
        this.UserService.presentAlert('Something went wrong')
      }
    },err =>{
      this.UserService.dismissLoading()
      this.UserService.presentAlert('Something went wrong')
    })

  }
  back(){
    this.nvctrl.back()
  }
}
