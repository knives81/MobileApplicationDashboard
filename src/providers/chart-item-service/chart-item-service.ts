import { Injectable  } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
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

  load(serverInput : string, tag : string) {
    let apiUrl = serverInput+'/chartitem?filter='+tag;
    return new Promise(resolve => {
      this.http.get(apiUrl)
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
