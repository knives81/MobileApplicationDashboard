import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChartSelectorServiceProvider } from '../../providers/chart-selector-service/chart-selector-service';
import { ChartPage } from '../chart/chart';

/**
 * Generated class for the ChartselectorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chartselector',
  templateUrl: 'chartselector.html',
})
export class ChartselectorPage {

  results : any = 0;
  entityTypes : any;
  ciao : string = "TESTSET";

  chartPage = ChartPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public chartSelectorServiceProvider: ChartSelectorServiceProvider,
  public alertCtrl: AlertController) {
  }

  async getResult() {
    this.results = await this.chartSelectorServiceProvider.load();
    this.entityTypes = this.results.entityTypes;
    console.log(this.entityTypes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartselectorPage');
    this.getResult();
  }
  chart() {
    console.log(this.ciao);
  }

}
