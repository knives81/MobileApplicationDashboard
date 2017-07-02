import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartServiceProvider } from '../../providers/chart-service/chart-service';
import { Configuration } from '../../configuration/configuration';


/**
 * Generated class for the ChartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
  providers: [ChartServiceProvider]
})
export class ChartPage {
  results : any;
  chartLegend: boolean = true;

  chartOption = {
    showAllTooltips: true
	};

  confId : number;

  chartColors: Array<any> = [
   { // first color
     backgroundColor: ['rgba(0,176,80,1)','rgba(146,208,80,1)','rgba(255,255,0,1)','rgba(252,4,28,1)','rgba(192,0,0,1)','rgba(192,192,192,1)', 'rgba(48,48,48,1)']
   }
 ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public configuration : Configuration,
    public chartServiceProvider :ChartServiceProvider) {
      let confId = navParams.get('confId');
      this.getResult(confId);
  }

  async getResult(confId : number) {
    let serverUrl = await this.configuration.getServerAsync();
    this.results = await this.chartServiceProvider.load(serverUrl,confId);
    console.log(this.results);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
