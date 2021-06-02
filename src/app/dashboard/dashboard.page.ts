declare var google;
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AlertController, LoadingController, NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 5 
  };
  @ViewChild('mapp', { static: false }) mapElementt: ElementRef;
  mapp: any;
  mapVieww: boolean = false;
  directionsDisplayy = new google.maps.DirectionsRenderer;
  user: any;
  res: any;
  serviceReady: boolean = false;
  list: any;
  barberReady: any;
  barberlist: any;
  barberlist_map:any;
  marker: any = [];
  latitude: any = 35.921820;
  longitude: any = -84.049260;
  result
  sortby
  constructor(
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    private menu :MenuController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {

    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.userService.SaveAutoConfiqure(this.user.token)
        this.getAllevent(this.latitude,this.longitude)
      }else{
        
      }
    },err=>{

    })
    setTimeout(
      (z) => {
        this.GetLocation();
      }, 1000);
  }
   search(){
this.navCtrl.navigateForward('tabs/dashboard/searchfilter')
   }
  ngOnInit() {
  }
  GetLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.mapp.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
      this.getAllevent(this.latitude, this.longitude);
    }).catch((error) => {
    });
  }
  getdata(sort,id){
    this.showclass(id)
    this.sortby = sort
    this.getAllevent(this.latitude,this.longitude)

  }
  getAllevent(lat,long){
    this.userService.getData('getNearByEvents?latitude='+lat+'&longitude='+long+'&sort_by='+this.sortby+'&token='+this.user.token).subscribe(res =>{
      if(res){
        this.result = res['events']
      }else{
      this.userService.presentAlert("Something went Wrong")
      }
    },err =>{
      if(err.error.errormsg =='Not any resources found.'){
      }else{
        this.userService.presentAlert("Something went Wrong")
      }
    })
  }
  showclass(id){
    var data2 = document.getElementsByClassName('active')
    if(data2.length == 0){
      var data = document.getElementById(id)
      data.classList.toggle('active')
    }else{
      var id2 = data2[0].id
      if(id2 != id){
        var data = document.getElementById(id2)
        data.classList.toggle('active')
      }
      var data3 = document.getElementById(id)
      data3.classList.toggle('active')
    }
}
}
