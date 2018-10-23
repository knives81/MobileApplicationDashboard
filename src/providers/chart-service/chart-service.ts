import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../../configuration/configuration';
import { Util } from '../../configuration/util';


/*
  Generated class for the ChartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartServiceProvider {
  data : any;

  chart0 : any = {
	"type": "doughnut",
	"data": {
		"datasets": [{
			"fill": false,
			"data": [12,63,6,6,7,2],
			"label": "Status Piechart"
		}],
		"labels": ["No Run","Passed","Failed",	"Blocked","Not Completed","Passed With Defect"]
	},
	"colors": [{
		"backgroundColor": ["#C0C0C0","#00B050","#C00000","#FC041C","#FFFF00","#00B050"],
		"borderColor": ["#C0C0C0","#00B050","#C00000","#FC041C","#FFFF00","#00B050"]
	}],
	"options": {
    legend: {
    display: true,
    position: "bottom"
  },
  tooltips: {
    enabled: true,
  },
  showLabel: true,
  responsive:true,
  animation: { animateScale: true, animateRotate: true },
  maintainAspectRatio: false,
  customInfo: { text: "-11", color: "#C00000"}
	}
};

  chart1 : any = {
	"type": "line",
	"data": {
		"datasets": [{
			"fill": false,
			"data": [30,26,	25,	23,	12,	12],
			"label": "No Run"
		},
		{
			"fill": false,
			"data": [36,39,	53,	56,	63,	63],
			"label": "Passed"
		},
		{
			"fill": false,
			"data": [15,10,	2,3,6,6],
			"label": "Failed"
		},
		{
			"fill": false,
			"data": [15,17,7,5,6,6],
			"label": "Blocked"
		},
		{
			"fill": false,
			"data": [0,	4,7,7,7,7],
			"label": "Not Completed"
		},
		{
			"fill": false,
			"data": [0,	0,2,2,2,2],
			"label": "Passed With Defect"
		}],
		"labels": ["2018-02-02","2018-02-05","2018-02-06","2018-02-07",	"2018-02-08","2018-02-09"]},
	"colors": [{"backgroundColor": ["#C0C0C0"],	"borderColor": ["#C0C0C0"]},
	{"backgroundColor": ["#00B050"],"borderColor": ["#00B050"]},
	{"backgroundColor": ["#C00000"],"borderColor": ["#C00000"]},
	{"backgroundColor": ["#FC041C"],"borderColor": ["#FC041C"]},
	{"backgroundColor": ["#FFFF00"],	"borderColor": ["#FFFF00"]},
	{"backgroundColor": ["#00B050"],"borderColor": ["#00B050"]}],
	"options": {
    legend: {
    display: true,
    position: "bottom"
  },
  tooltips: {
    enabled: true,
  },
  showLabel: true,
  responsive:true,
  animation: { animateScale: true, animateRotate: true },
  maintainAspectRatio: false,
  customInfo: { text: "", color: "#000000"}
	}
};

  constructor(public http: Http, public configuration : Configuration,
    public alertCtrl : AlertController, public util: Util) {
    console.log('Hello ChartServiceProvider Provider');
  }

  public async load(confId : number) {
    let serverUrl = await this.configuration.getServer();
    let username = await this.configuration.getUsername();
    let password = await this.configuration.getPassword();
    return this.getChart(serverUrl, confId, username, password);
  }
  public async loadBySelector(selector : any) {
    let serverUrl = await this.configuration.getServer();
    let username = await this.configuration.getUsername();
    let password = await this.configuration.getPassword();
    return this.getChartByPost(serverUrl, selector, username, password);
  }

  private getChart(serverUrl: string, confId : number,username:string,password:string) {
    let options = this.util.getHeaders(username,password);
    let apiUrl = this.util.getChartUrl(serverUrl,confId);

    if(serverUrl=="") {
      return new Promise(resolve => {
        if(confId==0) {
            this.data = this.chart0;
        } else if(confId==1) {
            this.data = this.chart1;
        }
        resolve(this.data);
      })
    }

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

  private getChartByPost(serverUrl: string, selector : any,username:string,password:string) {
    let options = this.util.getHeaders(username,password);
    let apiUrl = this.util.getChartForSelectorUrl(serverUrl);

    if(serverUrl=="") {
      return new Promise(resolve => {
        this.data = this.chart0;
        resolve(this.data);
      })
    }

    return new Promise(resolve => {
      this.http.post(apiUrl,selector.data,options)
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
