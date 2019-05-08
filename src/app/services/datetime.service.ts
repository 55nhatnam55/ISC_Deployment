import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  formatDatetimeData(datetimeString): any {
    const array = datetimeString.substring(0, 10).split('-');
    const newFormat = array[0] + '-' + array[1] + '-' + array[2];
    return newFormat;
  }
}
