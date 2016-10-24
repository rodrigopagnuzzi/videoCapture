import { Diagnostic } from 'ionic-native';



export class PermissionsUtil {



    constructor() {

    }


    static checkCameraPermission(): Promise<boolean> {

        return new Promise((resolve, reject) => {


            Diagnostic.isCameraAuthorized().then(data => {

                if (!data) {

                    Diagnostic.requestRuntimePermissions(
                        Diagnostic.permissionGroups.STORAGE
                    ).then((statuses: any) => {

                        for (var permission in statuses) {

                            switch (statuses[permission]) {
                                case Diagnostic.permissionStatus.GRANTED:
                                    resolve(true);
                                    break;
                                case Diagnostic.permissionStatus.DENIED || Diagnostic.permissionStatus.DENIED_ALWAYS || Diagnostic.permissionStatus.NOT_REQUESTED:
                                    resolve(false);
                                    break;

                            }
                        }



                    });



                }
                else
                    resolve(true);






            });


        });
    }

    }