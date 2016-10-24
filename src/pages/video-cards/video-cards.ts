import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { VideoModel } from '../../model/video-model';
import { VideoProvider } from '../../providers/video-provider';
import { DatabaseProvider } from '../../providers/database-provider';
import { AlertProvider } from '../../providers/alert-provider';
import { DateUtil } from '../../util/date-util';
import { PermissionsUtil } from '../../util/permissions-util';
import { Splashscreen } from 'ionic-native';
import { VideoEdit } from '../video-edit/video-edit';


/*
  Generated class for the VideoCards page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-cards',
  templateUrl: 'video-cards.html'
})
export class VideoCards {


  videos = new Array<VideoModel>();

  constructor(public alertProvider: AlertProvider, public videoProvider: VideoProvider, public db: DatabaseProvider, public modalCtrl: ModalController) {
    this.setDatabase();

  }

  addVideo() {


    if (this.isAddEnabled()) {

      PermissionsUtil.checkCameraPermission().then(isAuthorized => {

        if (isAuthorized) {

          this.videoProvider.captureVideo().then(mediaFile => {

            this.videoProvider.createThumbnail(mediaFile).then(thumbnail => {

              this.videoProvider.createVideoObj(mediaFile, thumbnail).then(videoModel => {

                this.presentModal(videoModel);



              }).catch(error => {
                console.log("createVideoObj: " + error);

              });

            }).catch(error => {
              console.log("createThumbnail: " + error);

            });

          }).catch(error => {
            console.log("captureVideo: " + error);
          });

        } else
          this.alertProvider.presentPermissionPrompt().then(() => {
            this.addVideo();
          });

      }).catch(error => {
        console.log("checkCameraPermission: " + error);
      });

    }
    else
      this.alertProvider.presentToast();



  }

  editVideo(video: VideoModel, i: number) {

    this.presentModal(video, i)

  }

  removeVideo(id: number, i: number) {
    this.remove(id, i);

  }
  private isAddEnabled(): boolean {

    return this.videos.length == 0 ? true : DateUtil.isNextDay(this.videos[0].timeStamp);


  }


  private insert(video: VideoModel) {

    video.timeStamp = DateUtil.transformDate(DateUtil.DB_DATE_FORMAT, video.timeStamp);

    this.db.insert(video).then(data => {


      video.id = data.insertId;
      video.timeStamp = DateUtil.transformDate(DateUtil.LOCAL_DATE_FORMAT, video.timeStamp);

      this.videos.unshift(video);

    }).catch(error => {
      console.log(error);
    });

  }

  private remove(id: number, i: number) {

    this.alertProvider.presentRemovePrompt().then(shouldRemove => {

      if (shouldRemove) {

        this.db.remove(id).then(data => {

          this.videos.splice(i, 1);

        }).catch(err => {
          console.log(err);
        })

      }

    }).catch(err => {
      console.log(err);

    })

  }

  private getAll() {



    this.db.getAllOrderedByTime().then(data => {

      for (let x = 0; x < data.rows.length; x++)
        this.videos.unshift(
          new VideoModel(
            data.rows.item(x).videoURI,
            data.rows.item(x).thumbnailURI,
            data.rows.item(x).desc,
            data.rows.item(x).id,
            DateUtil.transformDate(DateUtil.LOCAL_DATE_FORMAT, data.rows.item(x).timeStamp)
          ));



      this.hideSplashscreen();


    }).catch(err => {
      console.log(err);

    });
  }

  private hideSplashscreen() {
    setTimeout(() => {
      Splashscreen.hide();
    }, 300)

  }

  private update(video: VideoModel, index: number) {


    this.db.updateDesc(video).then(data => {


      this.videos[index].desc = video.desc;

    }).catch(err => {
      console.log(err);

    });
  }


  private presentModal(video: VideoModel, i?: number) {


    let modal = this.modalCtrl.create(VideoEdit, { video: video, index: i });
    modal.present();

    modal.onDidDismiss(data => {
      console.log(data.video);


      if (data.video != null)
        data.index != null ? this.update(data.video, data.index) : this.insert(data.video);





    });
  }




  private setDatabase() {

    this.db.setDabatase().then(data => {



      this.getAll();


    }).catch(err => {
      console.log(err);

    });

  }




}
