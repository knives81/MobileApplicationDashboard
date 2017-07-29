import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../configuration/configuration';
import { AlertController} from 'ionic-angular';

/*
  Generated class for the TestConfigurationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TestConfigurationServiceProvider {

  data : any;

  constructor(public http: Http, public configuration : Configuration,
    public alertCtrl : AlertController) {
    console.log('Hello TestConfigurationServiceProvider Provider');
  }




  checkConf(serverUrl : string, username : string, password : string) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    let options = new RequestOptions({headers:headers});


    let apiUrl = 'http://'+serverUrl+'/checkconf';
    console.log(apiUrl);

    return new Promise(resolve => {
      this.http.get(apiUrl,options)
        .map(res => res)
        .subscribe(
        data => {
          console.log("OK");
          let alert = this.alertCtrl.create({
            title : 'Info',
            subTitle : 'Connection Working',
            buttons : ['Ok']
          });
          alert.present();
          this.data = data;
          resolve(this.data);
        },
        err => {
          console.log("Errorre cazzo"+err);
          let alert = this.alertCtrl.create({
            title : 'Error',
            subTitle : 'Connection Error',
            buttons : ['Ok']
          });
          alert.present();
        });
    });

  }

}
