import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { VideoModel } from '../../model/video-model';


/*
  Generated class for the VideoEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-edit',
  templateUrl: 'video-edit.html'
}
)

export class VideoEdit {

  video: VideoModel;
  desc: string;
  index: number;

  constructor(public platform: Platform, public navParams: NavParams, public viewCtrl: ViewController) { }

  ionViewDidLoad() {


    this.getParameters();
    this.onBackButtonListener();



  }

  close(video?: VideoModel, index?: number) {


    this.viewCtrl.dismiss({ video: video, index: index });

  }

  onBackButtonListener() {

    this.platform.registerBackButtonAction(() => {

      this.viewCtrl.isLast() ? this.close() : this.platform.exitApp();


    });
  }

  doneEditing() {
    this.video.desc = this.desc;

    this.close(this.video, this.index);

  }

  private getParameters() {


    if (this.navParams.get('video') != null) {
      this.video = this.navParams.get('video');
      this.desc = this.video.desc;
    }

    if (this.navParams.get('index') != null)
      this.index = this.navParams.get('index');


  }



}
