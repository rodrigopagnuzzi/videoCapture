import { Injectable } from '@angular/core';
import { Splashscreen, MediaCapture, VideoEditor, MediaFile } from 'ionic-native';
import { VideoModel } from '../model/video-model';
import { DateUtil } from '../util/date-util';
import { AlertProvider } from './alert-provider';
/*
  Generated class for the Video provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VideoProvider {

  constructor(public alertProvider: AlertProvider) {

  }


  captureVideo(): Promise<MediaFile> {

    return new Promise((resolve, reject) => {

      MediaCapture.captureVideo({
        duration: 1,
        limit: 1
      }).then(mediaFiles => {

        let mediaFile: MediaFile = mediaFiles[0];


        resolve(mediaFile);


      }).catch(error => {
        reject(error)
      });

    });

  }

  createThumbnail(mediaFile: MediaFile): Promise<string> {

    return new Promise((resolve, reject) => {


      VideoEditor.createThumbnail({
        fileUri: mediaFile.fullPath,
        outputFileName: this.thumbnailPath(mediaFile.fullPath),
        height: 150,
        quality: 100
      }).then(thumbnail => {
        console.log(thumbnail);


        resolve(thumbnail);

      }).catch(error => {
        reject(error);
      });
    });


  }

  createVideoObj(mediaFile: MediaFile, thumbnailURI: string): Promise<VideoModel> {

    return new Promise((resolve, reject) => {


      resolve(
        new VideoModel(
          mediaFile.fullPath,
          thumbnailURI,
          null,
          null,
          DateUtil.transformDate(DateUtil.LOCAL_DATE_FORMAT, null, mediaFile.lastModifiedDate)
        ));



    });


  }

  private thumbnailPath(fullPath: string) {

    return fullPath.substring(fullPath.lastIndexOf('/'), fullPath.lastIndexOf('.'));
  }








}
