import { Injectable } from '@angular/core';
import {RequestOptions, Headers } from '@angular/http';


@Injectable()
export class Util {
  constructor() {}

   getHeaders(username : string, password : string): RequestOptions {
    let headers: Headers = new Headers();
	headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    let options = new RequestOptions({headers:headers});
    return options;
  }

  getCheckConfUrl(serverUrl: string) {
    return 'http://'+serverUrl+'/checkconf';
  }
  getChartItemUrl(serverUrl: string, tag: string) {
    return 'http://'+serverUrl+'/chartitemgroup?filter='+tag;
  }

  getChartUrl(serverUrl: string, confId : number) {
    return 'http://'+serverUrl+'/chart/'+confId;
  }
  getChartForSelectorUrl(serverUrl: string) {
    return 'http://'+serverUrl+'/chart';
  }
  getInfoAppUrl(serverUrl: string) {
    return 'http://'+serverUrl+'/infoapp';
  }
  getSelectorUrl(serverUrl: string) {
    return 'http://'+serverUrl+'/selector';
  }

  logTime(message: string){
    var d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    console.log(message + ' ' + dformat);
  }
}
