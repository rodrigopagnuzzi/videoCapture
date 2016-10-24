export class VideoModel {



    public videoURI: string;
    public thumbnailURI: string;
    public desc: string;
    public id: number;
    public timeStamp: string;

    constructor(videoURI?: string,
        thumbnailURI?: string,
        desc?: string,
        id?: number,
        timeStamp?: string) {

        this.videoURI = videoURI;
        this.thumbnailURI = thumbnailURI;
        this.desc = desc;
        this.id = id;
        this.timeStamp = timeStamp;

    }



}