import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../configuration/configuration';
import { Util } from '../../configuration/util';

/*
  Generated class for the AboutServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AboutServiceProvider {

  data : any;

  constructor(public http: Http, public configuration : Configuration,
  public alertCtrl : AlertController, public util: Util) { }

  public async load() {
    let serverUrl = await this.configuration.getServer();
    let username = await this.configuration.getUsername();
    let password = await this.configuration.getPassword();
    return this.getAbout(serverUrl,username,password);
  }

  private getAbout(serverUrl: string,username:string,password:string) {
    let options = this.util.getHeaders(username,password);
    let apiUrl = this.util.getInfoAppUrl(serverUrl);


    console.log(apiUrl,options);
    return new Promise(resolve => {
      this.http.get(apiUrl,options)
        .map(res => res.json())
        .subscribe(data => {
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
