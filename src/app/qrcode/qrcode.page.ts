import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as QRCodeStyling from 'qr-code-styling'
import { Storage } from '@ionic/storage';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  user: any;
  qrCode
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public router: Router,

  ) { }
  ionViewWillEnter(){
    this.storage.get('user').then((val) => {
      if (val != null) {
        this.user = val;
        this.getqr(this.user.user_id)
      }else{
        this.storage.clear();
        this.router.navigate(['/login']);
      }
    },err=>{
      this.storage.clear();
      this.router.navigate(['/login']);
    });
  }
  ngOnInit() {


  }
  back(){
    this.navCtrl.back()
  }
getqr(user_id){
  this.qrCode = new QRCodeStyling({
    width: 220,
    height: 220,
    data: 'instacash.app '+String(user_id),
    image: "assets/images/insta-logo.jpg",
    dotsOptions: {
        color: "#000",
        type: "dots",
    },
    cornersSquareOptions:{
      color: "#fff",
      type: "square"
    },
    cornersDotOptions:{
      color: "#fff",
      type: "square"
    },
    backgroundOptions: {
        color: "#fff",
    },
});
this.qrCode.append(document.getElementById("canvas"));
}
saveCanvasImage() {
  var dataUrl = this.qrCode

  let ctx = this.qrCode
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
 
  let name = new Date().getTime() + '.png';
  var file = new File()

  let path = file.dataDirectory;
  let options: IWriteOptions = { replace: true };
 
  var data = dataUrl.split(',')[1];
  let blob = this.b64toBlob(data, 'image/png');
 
  file.writeFile(path, name, blob, options).then(res => {
  }, err => {
  });
}
b64toBlob(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
 
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
 
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

}
