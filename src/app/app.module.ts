import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpClientModule } from '@angular/common/http'; 
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx/index';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx/index';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx/index';
import { Stripe } from '@ionic-native/stripe/ngx/index';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal/ngx/index';
import { Contacts } from '@ionic-native/contacts/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Globalization } from '@ionic-native/globalization/ngx/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx/index';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx/index';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx/index';
import { Network } from '@ionic-native/network/ngx/index';
import { NFC } from '@ionic-native/nfc/ngx/index';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
     IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
    ],
  providers: [
    StatusBar,
    NFC,
    SplashScreen,
    Storage,
    NativeStorage,
    Camera,
    File,
    FilePath,
    FileTransfer,
    FileChooser,
    Stripe,
    StreamingMedia,
    Globalization,
    Contacts,
    AndroidPermissions,
    OneSignal,
    QRScanner,
    BarcodeScanner,
    NativeAudio,
    Geolocation,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
