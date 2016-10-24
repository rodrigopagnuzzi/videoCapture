import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the Alert provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertProvider {



  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }



  presentRemovePrompt(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: 'Exclusão',
        message: 'Tem certeza que deseja excluir o vídeo?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Excluir',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();

    });


  }

  presentPermissionPrompt(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: 'Atenção',
        message: 'Necessitamos da permissão para podermos gravar vídeos',
        buttons: [
          {

            text: 'OK',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();

    });


  }



  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Só é possível gravar um vídeo por dia',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }


}
