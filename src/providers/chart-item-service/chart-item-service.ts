import { Injectable  } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../configuration/configuration';

/*
  Generated class for the ChartItemServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartItemServiceProvider {


  data : any;

  constructor(public http: Http, public configuration : Configuration,
  public alertCtrl : AlertController) {
    console.log('Hello ChartItemServiceProvider Provider');

  }

  async load(tag : string) {
    let serverInput = await this.configuration.getServerOrDefaultServer();
    let username = await this.configuration.getUsernameOrDefaultUsername();
    let password = await this.configuration.getPasswordOrDefaultPassword();
    return this.getChartItem(serverInput, tag,username,password);
  }

  getChartItem(serverInput : string, tag : string, username:string,password:string) {

    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    let options = new RequestOptions({headers:headers});
    let apiUrl = 'http://'+serverInput+'/chartitem?filter='+tag;
    console.log(apiUrl);
    return new Promise(resolve => {
      this.http.get(apiUrl,options)
        .map(res =>  res.json())
        .subscribe(
          data => {
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
          }
          );
    });

  }




}
