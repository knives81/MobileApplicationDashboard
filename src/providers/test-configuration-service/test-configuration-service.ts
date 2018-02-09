import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../configuration/configuration';
import { Util } from '../../configuration/util';
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
    public alertCtrl : AlertController, public util: Util) {
  }

  checkConf(serverUrl : string, username : string, password : string) {
    let options = this.util.getHeaders(username,password);
    let apiUrl = this.util.getCheckConfUrl(serverUrl);
    
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
