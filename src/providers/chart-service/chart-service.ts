import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the ChartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartServiceProvider {
  data : any;

  constructor(public http: Http, public alertCtrl : AlertController) {
    console.log('Hello ChartServiceProvider Provider');
  }

  load(serverUrl: string, confId : number) {
    let apiUrl = serverUrl+'/testsetchart/'+confId.toString();
    console.log(apiUrl);
    return new Promise(resolve => {
      this.http.get(apiUrl)
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
