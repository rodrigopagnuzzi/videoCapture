import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { VideoModel } from '../model/video-model';

/*
 Generated class for the Database provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseProvider {

  private static storage: SQLite;


  private DATABASE_NAME = 'video.db';
  private DATABASE_LOCATION = 'default';

  constructor() { }


  setDabatase(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.openDatabase().then(data => {

        this.createTable().then(data2 => {

          resolve(data2);

        }).catch(err2 => {

          console.log(err2);
          reject(err2);

        });

      }).catch(err => {

        console.log(err);
        reject(err);

      })

    });



  }

  private openDatabase(): Promise<SQLite> {

    if (DatabaseProvider.storage == null) {

      DatabaseProvider.storage = new SQLite();

      return DatabaseProvider.storage.openDatabase({
        name: this.DATABASE_NAME,
        location: this.DATABASE_LOCATION
      })
    }

    else
      return Promise.resolve(DatabaseProvider.storage);

  }


  private createTable(): Promise<any> {


    return DatabaseProvider.storage.executeSql('CREATE TABLE IF NOT EXISTS video (id INTEGER PRIMARY KEY AUTOINCREMENT, videoURI TEXT, thumbnailURI TEXT, desc TEXT, timeStamp TEXT)', [])

  }

  insert(video: VideoModel): Promise<any> {

    return DatabaseProvider.storage.executeSql('INSERT INTO video (videoURI,thumbnailURI, desc, timeStamp) VALUES (?,?, ?, ?)', [video.videoURI, video.thumbnailURI, video.desc, video.timeStamp])
  }

  getAllOrderedByTime(): Promise<any> {
    return DatabaseProvider.storage.executeSql('SELECT * FROM video ORDER BY timeStamp ASC', [])
  }

  deleteAll() {

    return DatabaseProvider.storage.executeSql('DELETE FROM video', [])

  }

  updateDesc(video: VideoModel): Promise<any> {

    return DatabaseProvider.storage.executeSql('UPDATE video SET  desc = ? WHERE id = ?', [video.desc, video.id])

  }

  remove(id: number): Promise<any> {
    return DatabaseProvider.storage.executeSql('DELETE FROM video WHERE id = ?', [id]);
  }

}
