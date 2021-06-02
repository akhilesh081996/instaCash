import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams, Platform, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
declare var OT: any;
@Component({
  selector: 'app-liveevent',
  templateUrl: './liveevent.page.html',
  styleUrls: ['./liveevent.page.scss'],
})
export class LiveeventPage implements OnInit {
  session: any;
  loading: any;
  protected interval: any;
  maxTime: any = 80;
  token: string;
  status: number = -1;
  ref: any;
  publisher: any;
  sessionId: string;
  apiKey: any;
  dHeight: any;
  dWidth: any;
  bigH: any;
  bigW: any;
  miniH: any;
  miniW: any;
  user_token: any;
  startlive:boolean= false;
  recordingStatus: number = 0;
  isIncoming: boolean = false;
  broadcastId='';
  incomingData: any;
  streaming_url='';
  archive_id: any;
  start_call: boolean = false;
  insertOptions = {
    width: '100%',
    height: '100%',
    showControls: false
  };
  user
  eventid
  constructor(
    public userservice: UserService,
    public plt:Platform,
    public storage: Storage,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    ) { 
      this.apiKey = '47010654';
      this.dHeight = this.plt.height() - 120;
      this.dWidth = this.plt.width();
      this.bigH = this.dHeight;
      this.bigW = this.dWidth;
      this.miniH = 150;
      this.miniW = 100;
    this.eventid = this.route.snapshot.parent.paramMap.get('id');
  }
  ngOnInit() {
  }
  ionViewWillEnter() {    
    this.storage.get("user").then((userData) => {    
      if (userData) {            
        this.user_token = userData['token'];
        this.user = userData;       
      }      
    });  
  }
  handleModalDismiss(){
            this.status = 0;
            this.start_call =  false;
            this.sessionId = '';
            this.userservice.createSession()
              .subscribe(res => {             
                let res2: any = [];
                res2 = res;
                this.sessionId = res2.session_id;
                this.token = res2.token;           
                let publisherOptions = {
                  insertMode: 'append',
                  width: this.bigW,
                  height: this.bigH,
                };
                let options = {
                  width: this.miniW,
                  height: this.miniH,
                  insertMode: 'append'
                }
                var props = {connectionEventsSuppressed: true};
                this.session = OT.initSession(this.apiKey, this.sessionId, props);
                this.publisher = OT.initPublisher('publisher', publisherOptions);
                this.session.on({
                  sessionConnected: (event: any) => {
                    var params = {
                      'session_id': this.sessionId, 
                      'ot_token': this.token, 
                      'token':this.user_token,
                      'event_id':this.eventid
                    };
                    this.userservice.startBroadcast(params).subscribe(res => {
                      let res2: any = [];
                      res2 = res;
                      this.startlive = true;
                      this.broadcastId = res2.broadcastId;
                    },err=>{
                        this.endCall();
                    });
                    this.session.publish(this.publisher);
                  }
                });
                this.session.connect(this.token, (error: any) => {
                  
                  if (error) {
                  } else {                                    
                    
                  }
                });    
              }, err => {
              });
  }

  startCall() {
    this.start_call =  true;
    let cc = this.userservice.checkNetworkConnection();
    if (cc == 'none') {
      this.start_call =  false;
    }
    else {
      this.handleModalDismiss();   
    }
  } 

   checkBroadcastStatus(session) {
    session.signal({
      type: 'broadcast',
      data: 'status'
    });
  };

  closeCall(){
    this.navCtrl.back();
  }

  setEventListeners(session) {
    const streams = [];
    const subscribers = [];
    let broadcastActive = false;

    session.on('streamCreated', function (event) {
      streams.push(event.stream);
      if (broadcastActive) {
        subscribers.push(this.subscribe(session, event.stream));
      }
      if (streams.length > 3) {
        document.getElementById('videoContainer').classList.add('wrap');
      }
    })

    session.on('streamDestroyed', function (event) {
      const index = streams.indexOf(event.stream);
      streams.splice(index, 1);
      if (streams.length < 4) {
        document.getElementById('videoContainer').classList.remove('wrap');
      }
    })

    session.on('signal:broadcast', function (event) {
      const status = event.data;
      broadcastActive = status === 'active';

      if (status === 'active') {
        streams.forEach(function (stream) {
          subscribers.push(this.subscribe(session, stream));
        });
      } else if (status === 'ended') {
        subscribers.forEach(function (subscriber) {
          session.unsubscribe(subscriber);
        });
      }
      this.updateBanner(status);
    });
  }

  subscribe(session, stream) {
    const name = stream.name;
    const insertMode = name === 'Host' ? 'before' : 'after';
    const properties = Object.assign({ name: name, insertMode: insertMode }, this.insertOptions);
    session.subscribe(stream, 'hostDivider', properties, function (error) {
      if (error) {
      }
    });
  }

  JoinCall(){
    
  }
  
  startArc(post_id){
    this.userservice.startArc(this.sessionId, this.user_token, post_id)
    .subscribe(res => {
      let res2: any = [];
      res2 = res;
      this.archive_id = res2.archive_id;

      this.recordingStatus = 2;

    }, (err) => {
    });
}

endArc() {
  this.userservice.endArc(this.archive_id)
    .subscribe(res => {
      let res2: any = [];
      res2 = res;
      this.recordingStatus = 0;

    }, (err) => {
    });
}

  goBack(){
    this.navCtrl.back();
  }

  endCall() {
        setTimeout(() => {
          this.dismiss();
        }, 1000);
      this.startlive = false;
        this.userservice.stopBroadcast({'token':this.user_token, 'broadcast_id':this.broadcastId,'event_id':this.eventid}).subscribe(res => {
          let res2: any = [];
          res2 = res;
        });
  }
  async dismiss() {
    if (this.session) {
      this.session.disconnect();
    }
    if (this.ref) {
      this.ref.off;
    }
  }
}
