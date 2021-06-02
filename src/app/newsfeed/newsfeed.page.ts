import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Storage } from '@ionic/storage';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {
  user: any;
  newsData: any;
  stringsearch = '1'
  categoryList:any = [];
  allfeedCategory:any = [];
  availablebalnc = 0
  transactions: any;
  page:number=1;
  constructor(
    private userService: UserService,
    public navCtrl:NavController,
    public storage:Storage,
  ) {
    this.userService.showLoader();
   }

  ngOnInit() {
  }


  back(){
    this.navCtrl.back()
  }

  filterFeeds(value){
    this.stringsearch = value
    this.page = 1
  }


  ionViewWillEnter(){
    this.page = 1
    this.storage.get('user').then(userInfo => {
      if (userInfo != null) {
        this.user = userInfo;
        this.getnews()
        this.getTranHist()
      }
      
    }, err => {
      this.navCtrl.navigateForward(['/login']);
    });
  }



  getnews(){
    setTimeout(() => {
      this.userService.getData('getnews_list?token='+this.user.token+'&category').subscribe(res=>{
        this.userService.dismissLoading();
        if(res['status_code'] == 200){
          this.newsData = res['listing'];
          this.categoryList = []
          this.categoryList = res['terms'];
        }
      }, error=>{
        this.userService.dismissLoading();
        this.userService.presentToast("Something went wrong!");
      });
    }, 400)

  }

  singleNews(data){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        data: JSON.stringify(data)
      }
    };
    this.navCtrl.navigateForward(["/newsdetail"],navigationExtras);
  }


  search(){
    this.userService.getData('getNewsList?token='+this.user.token+'&string='+this.stringsearch).subscribe(res =>{

    },err =>{
      
    })
  }
  getTranHist(){
    this.userService.getData('transactionHistory?token='+this.user.token+'&page_no='+this.page).subscribe(res =>{
      if(res){
        this.availablebalnc = res['wallet_balance']
        this.transactions = res['transactions']
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
  loadMore(event) {
    this.page++;
    this.userService.getData('transactionHistory?token='+this.user.token+'&page_no='+this.page).subscribe(res =>{
      if(res['status'] == 'ok'){
        event.target.complete();
        if(res['transactions'] != null){
          this.transactions = [...this.transactions, ...res['transactions']];
        }else{
          this.page--;
        }
      }else{
        this.userService.presentAlert("Something went wrong")
        event.target.complete();
      }
    },err =>{
      this.page--;
      event.target.complete();
      this.userService.dismissLoading()
    this.userService.presentAlert('Something went Wrong')
    })
  }
  gotoHist(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        detail: JSON.stringify(data),
      }
    };
    this.navCtrl.navigateForward(['/historydetail'], navigationExtras);
  }
}
