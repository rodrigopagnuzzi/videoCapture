import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { VideoCards } from '../pages/video-cards/video-cards';
import { VideoEdit } from '../pages/video-edit/video-edit';
import { VideoProvider } from '../providers/video-provider';
import { DatabaseProvider } from '../providers/database-provider';
import { AlertProvider } from '../providers/alert-provider';
import {Focuser} from "../components/focuser/focuser";


@NgModule({
  declarations: [
    MyApp,
    VideoCards,
    VideoEdit,
    Focuser
  ],
  imports: [
    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideoCards,
    VideoEdit
  ],
  providers: [DatabaseProvider, VideoProvider, AlertProvider]

})
export class AppModule {}
