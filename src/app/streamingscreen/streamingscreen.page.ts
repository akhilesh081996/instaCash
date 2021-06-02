import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-streamingscreen',
  templateUrl: './streamingscreen.page.html',
  styleUrls: ['./streamingscreen.page.scss'],
})
export class StreamingscreenPage implements OnInit {
  streaming_url='';
  getData
  user
  constructor(
    public userservice: UserService,
    public storage: Storage,
    public navCtrl: NavController,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.getData= JSON.parse(params.data)
        this.streaming_url= this.getData.live_url
      }
    })
   }

  ngOnInit() {
  }
  ionViewWillEnter() {    
    this.storage.get("user").then((userData) => {    
      if (userData) {            
        this.user = userData;       
      }      
    });  
  }
  backstream(){
    this.navCtrl.back()
  }
}
