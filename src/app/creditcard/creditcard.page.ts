import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { EventService } from '../event.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx/index';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.page.html',
  styleUrls: ['./creditcard.page.scss'],
})
export class CreditcardPage implements OnInit {

  slideOpts = {
    slidesPerView: 1.1,
    spaceBetween: 10 
  };


  card_form: FormGroup;
  user: any;
  setting;
  cardres;

  constructor(
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public storage: Storage,
    public router: Router,
    public plt: Platform,
    private stripe: Stripe,
    public UserService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public event:EventService
  ) {
    this.card_form = new FormGroup({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      'number': new FormControl(''),
      'expire_date': new FormControl(''),
      'cvc': new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    });
   }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back()
  }
  ionViewWillEnter(){
    this.GetSetting();
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
          this.GetSetting();
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  GetSetting() {
    this.UserService.getData('GetSetting')
      .subscribe(res => {
        this.setting = res;
      })
  }
  CreatePayment(card) {
    let card_details = card.expire_date.split('/');
    this.stripe.setPublishableKey(this.setting.publishable_key);
    let card_new = {
      name: card.name,
      number: card.number,
      expMonth: card_details[0],
      expYear: card_details[1],
      cvc: card.cvc,
      currency: 'USD'
    };
    this.UserService.showLoader();
    this.stripe.createCardToken(card_new)
      .then(token => {
          this.UserService.addCardtoBank(this.user.token, token.id)
            .subscribe(res => {
              this.event.publishEvent({event:'fetch_card'})
              this.cardres = res;
              this.UserService.dismissLoading();
              if (this.cardres.status == "ok") {
                this.card_form.reset()
                this.navCtrl.navigateForward('tabs/profile')
              }
            },
              (err) => {
                let msg = err.error.msg;
                if (msg == '') {
                  this.UserService.presentAlert("something went wrong, please try again later.");
                } else {
                  this.UserService.presentAlert(msg);
                }
                this.UserService.dismissLoading();
                if (err.error.error_code == "user_not_found") {

                  this.router.navigate(['/login']);
                }
              })
      })
      .catch(error => {
        this.UserService.presentAlert(error);
        this.UserService.dismissLoading();
      });
  }
}
