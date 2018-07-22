import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController} from 'ionic-angular';
import { Configuration } from '../../configuration/configuration';
import { Util } from '../../configuration/util';

/*
  Generated class for the ChartSelectorServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartSelectorServiceProvider {

  data : any;

  selector : Array<any> = [{
	"entityType": "DEFECT",
	"items": [{
		"tagName": "CR",
		"tagValues": ["PMOyyy125",
		"PMOyyy122",
		"ALL"],
		"tagSelected": ""
	},
	{
		"tagName": "Chart Type",
		"tagValues": ["PIECHART",
		"LINECHART"],
		"tagSelected": ""
	}]
},
{
	"entityType": "TESTSET",
	"items": [{
		"tagName": "CR",
		"tagValues": ["PMOyyy125",
		"PMOyyy122",
		"ALL"],
		"tagSelected": ""
	},
	{
		"tagName": "Cycle",
		"tagValues": ["CFI",
		"CA",
		"ALL"],
		"tagSelected": ""
	},
	{
		"tagName": "Chart Type",
		"tagValues": ["PIECHART",
		"LINECHART"],
		"tagSelected": ""
	}]
}];



  constructor(public http: Http, public configuration : Configuration,
  public alertCtrl : AlertController, public util: Util) {
  }

  public async load() {
    let serverUrl = await this.configuration.getServer();
    let username = await this.configuration.getUsername();
    let password = await this.configuration.getPassword();
    return this.getSelector(serverUrl,username,password);
  }

  private getSelector(serverUrl : string, username:string,password:string) {
    let options = this.util.getHeaders(username,password);
    let apiUrl = this.util.getSelectorUrl(serverUrl);

    if(serverUrl=="") {
      return new Promise(resolve => {
        this.data = this.selector;
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
