import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  async testConnection(serverUrl : string) {
    this.data = await this.getHealth(serverUrl);
    console.log(this.data.status);
  }

  getHealth(serverUrl : string) {
    let apiUrl = serverUrl+'/health';
    console.log(apiUrl);

    return new Promise(resolve => {
      this.http.get(apiUrl)
        .map(res => res.json())
        .subscribe(
        data => {
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
          console.log(err.status);
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
