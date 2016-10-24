import Moment from 'moment';

export class DateUtil {

  static LOCAL_DATE_FORMAT = 0;
  static DB_DATE_FORMAT = 1;

  static transformDate(type: number, dateString?: string, date?: Date): string {

    switch (type) {

      case DateUtil.LOCAL_DATE_FORMAT:
        return dateString ? Moment(dateString, 'YYYY-MM-DD HH:mm').format('HH:mm DD/MM/YY') : Moment(date).format('HH:mm DD/MM/YY');



      case DateUtil.DB_DATE_FORMAT:
        return dateString ? Moment(dateString, 'HH:mm DD/MM/YY').format('YYYY-MM-DD HH:mm') : Moment(date).format('YYYY-MM-DD HH:mm');



    }
  }





  static isNextDay(date: string): boolean {

    let currentDate = Moment();
    let lastInsertedObjDate = Moment(date, 'HH:mm DD/MM/YY');

    return (currentDate.day() - lastInsertedObjDate.day()) != 0;




  }



}



