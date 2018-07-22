import { Injectable  } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../configuration/configuration';
import { Util } from '../../configuration/util';

/*
  Generated class for the ChartItemServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartItemServiceProvider {
  data : any;

  chartItem: Array<any> = [
  {"desc": "Demo Data Piechart",	"tags": ["Tag1","Tag2"], "chartType": "PIECHART",	"entityType": "TESTSET", "confId": 0},
  {"desc": "Demo Data Linechart",	"tags": ["Tag3"], 	"chartType": "LINECHART", 	"entityType": "TESTSET","confId": 1}
];

chartItem2: Array<any> = [
  {"group":"CR1234567","chartItems":[
    {"desc": "Demo Data Piechart 1",	"tags": ["CR1234567","Tag1"], "chartType": "PIECHART",	"entityType": "TESTSET", "confId": 0},
  {"desc": "Demo Data Linechart",	"tags": ["CR1234567","Tag2"], 	"chartType": "LINECHART", 	"entityType": "TESTSET","confId": 1}
  ]},
  {"group":"CR7654321","chartItems":[
    {"desc": "Demo Data Piechart 2",	"tags": ["CR7654321","Tag3"], "chartType": "PIECHART",	"entityType": "TESTSET", "confId": 0},
    {"desc": "Demo Data Linechart 2",	"tags": ["CR7654321","Tag4"], 	"chartType": "LINECHART", 	"entityType": "TESTSET","confId": 1}
  ]}];

  constructor(public http: Http, public configuration : Configuration,
  public alertCtrl : AlertController, public util: Util) {
  }



  public async load(tag : string) {
    let serverUrl = await this.configuration.getServer();
    let username = await this.configuration.getUsername();
    let password = await this.configuration.getPassword();
    return this.getChartItem(serverUrl, tag,username,password);
  }

  private getChartItem(serverUrl : string, tag : string, username:string,password:string) {
    let options = this.util.getHeaders(username,password);
    let apiUrl = this.util.getChartItemUrl(serverUrl,tag);

    if(serverUrl=="") {
      return new Promise(resolve => {
        this.data = this.chartItem2;
        resolve(this.data);
      })
    }

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
