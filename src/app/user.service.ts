import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx/index';
import { Globalization } from '@ionic-native/globalization/ngx/index';
import { Network } from '@ionic-native/network/ngx/index';


let Url = 'https://instapass.betaplanets.com/';
let fullUrl = 'https://instapass.betaplanets.com/wp-json/mobileapi/v1/';
let url = 'https://instapass.betaplanets.com/wp-json/wp/v2/';
let authurl = 'https://instapass.betaplanets.com/wp-json/jwt-auth/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loading: any;
  one_id;
  token;
  type;
  iana_timezone: any;

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastController:ToastController,
    private oneSignal: OneSignal,
    private platform: Platform,
    public globalization:Globalization,
    private network: Network
    ) { }
    getURL() {
      return Url;
    }

    async presentAlert(msg = '') {
      if(msg == '' || msg ==null || msg == undefined){
        msg = 'Something Went Wrong! Please try again'
      }
      let alert = await this.alertCtrl.create({
        message: msg,
        buttons: [{
          text: 'OK',
          handler: () => {
  
          }
        }]
      })
      await alert.present();
    }
  
    async dismissLoading() {
      if(this.loading){
        await this.loading.dismiss();
      }
    }
  
    async showLoader(msg: string = '') {
      if (msg == '') {
        msg = 'Please wait...';
      }
      this.loading = await this.loadingCtrl.create({ message: msg });
      await this.loading.present();
    }
    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 3000,
        position:'bottom'
      });
      toast.present();
    }
    getData(endPoint) {
      return this.http.get(fullUrl + endPoint).pipe(
        map(data => {
          return data;
        })
      )
    }
  
    sendData(endPoint, data) {
      return this.http.post(fullUrl + endPoint, data).pipe(
        map(data => {
          return data;
        })
      )
    }
    auth(endPoint, data) {
      return this.http.post(authurl + endPoint, data).pipe(
        map(data => {
          return data;
        })
      )
    }
    startBroadcast(data){
      return this.http.post(Url + "wp-json/mobileapi/v1/start_broadcast",data)
    }
  
    stopBroadcast(data){
      return this.http.post(Url + "wp-json/mobileapi/v1/stop_broadcast",data)
    }
  
    getBroadcastDetail(id){
      return this.http.get("https://api.opentok.com/v2/project/46955904/broadcast/"+id)
    }
  
    endSession(data){
      return this.http.post(Url + "wp-json/mobileapi/v1/end_session", data)
    }
    checkNetworkConnection() {
      return this.network.type;
    }
    startArc(session_id, token, post_id=0){
      return this.http.post(Url + "wp-json/mobileapi/v1/start_arc",{
        session_id: session_id,
        token: token,
        post_id: post_id
      })
    }
  
    endArc(archive_id){
      return this.http.post(Url + "wp-json/mobileapi/v1/end_arc",{
        archive_id: archive_id
      })
    }
    createSession(){
      return this.http.post(Url + "wp-json/mobileapi/v1/create_session",{
      })
    }
    GetSetting() {
      return this.http.post(Url + 'wp-json/mobileapi/v1/GetSetting', {
      });
    }
    addCardtoBank(token, stripeToken) {
      return this.http.post(Url + 'wp-json/mobileapi/v1/add_debit_card', {
        token: token,
        type: 'card',
        stripeToken: stripeToken
      });
    }
    async SaveAutoConfiqure(token) {
      if (this.platform.is('cordova')) {
        this.oneSignal.getIds().then((id) => {
          this.one_id = id.userId;
          this.token = token;
          this.saveOneSignID(this.token, this.one_id).subscribe(m => {
          });
        });
      }
    }
    saveOneSignID(token, oneSignID) {
      if(this.platform.is('android')){
        this.type ='android'
      }else{
        this.type ='ios'
      }
      this.globalization.getDatePattern({ formatLength: 'string', selector: 'timezone and utc_offset' }).
        then(res => {
          this.iana_timezone = res.iana_timezone
          this.http.post(Url + 'wp-json/mobileapi/v1/save_onesignal_id', {
            oneSignID: oneSignID,
            token: token,
            type: this.type,
            timezone: this.iana_timezone
          })
        })
        .catch(e => {
        }
          )
    
      return this.http.post(Url + 'wp-json/mobileapi/v1/save_onesignal_id', {
        oneSignID: oneSignID,
        token: token,
        type: this.type,
        timezone: this.iana_timezone
      });
    }
    sendMedia(endPoint,data,token){
      const HttpUploadOptions = {
        headers: new HttpHeaders({ 'Authorization': 'Bearer '+ token })
      }
      return this.http.post(fullUrl+endPoint,data,HttpUploadOptions).pipe(
        map(data => {
          return data;
        })
      )
        
    }
  }
