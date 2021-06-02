import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, ActionSheetController, Platform} from '@ionic/angular';
import { UserService } from '../user.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx/index';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx/index';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Stripe ,StripeBankAccountParams} from '@ionic-native/stripe/ngx/index';

@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.page.html',
  styleUrls: ['./addbank.page.scss'],
})
export class AddbankPage implements OnInit {

  images: any[];
  setting
  addbankform: FormGroup;
  user: any;
  image_data: any;
  type: any;
  image_data1: any;
  images1: any[];
  type1: any;
  imagefrontadd = false;
  imagebackadd: boolean = false;

  constructor(
    public userService: UserService,
    public navCtrl:NavController,
    public filePath: FilePath,
    public ref: ChangeDetectorRef,
    public camera: Camera,
    public transfer: FileTransfer,
    public actionSheetController: ActionSheetController,
    public plt: Platform,
    public Storage:Storage,
    private sanitizer: DomSanitizer,
    public router: Router,
    private stripe: Stripe,
  ) { }
  ionViewWillEnter(){
    this.Storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.GetSetting();
      }else{
        this.Storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.Storage.clear();
      this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
    this.addbankform = new FormGroup({
      'routing_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'account_number': new FormControl('', Validators.compose([
        Validators.required
      ])),
      'account_holder_name': new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }
  back(){
    this.navCtrl.back()
  }
   GetSetting() {
    this.userService.getData('GetSetting')
      .subscribe(res => {
        this.setting = res;
      })
  }
  submit(data){
    this.userService.showLoader()
    this.stripe.setPublishableKey(this.setting.publishable_key);
    var bankAccount = {
      routing_number: data.routing_number,
      account_number: data.account_number,
      account_holder_name: data.account_holder_name, 
      account_holder_type: 'individual', 
      currency: 'USD',
      country: 'US'
    };
    this.stripe.createBankAccountToken(bankAccount).then(res =>{
      data['token'] = this.user.token
      data['stripeToken'] = res['id']
      this.userService.sendData('addBankToConnectedAccount',data).subscribe(res =>{
        if(res['status'] == 'ok'){
          this.userService.dismissLoading()
          this.navCtrl.navigateForward('tabs/profile')
          this.userService.presentAlert('Bank added')
        }else{
          this.userService.dismissLoading()
          this.userService.presentAlert('Something went Wrong')
        }
      },err =>{
        this.userService.dismissLoading()
        this.userService.presentAlert('Something went Wrong')
      })
    },err =>{
      this.userService.dismissLoading()
      this.userService.presentAlert('Something went Wrong')
    })
  }
}
