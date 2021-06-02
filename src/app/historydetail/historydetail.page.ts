import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, Platform ,ActionSheetController ,NavParams} from '@ionic/angular';

@Component({
  selector: 'app-historydetail',
  templateUrl: './historydetail.page.html',
  styleUrls: ['./historydetail.page.scss'],
})
export class HistorydetailPage implements OnInit {
  reciverData
  constructor(
    public route: ActivatedRoute,
    public nav:NavController

  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.detail) {
        this.reciverData = JSON.parse(params.detail)
      }
    });
   }

  ngOnInit() {
  }

}
