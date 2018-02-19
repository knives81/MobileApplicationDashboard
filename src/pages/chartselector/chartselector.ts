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



  chartPage = ChartPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public chartSelectorServiceProvider: ChartSelectorServiceProvider,
  public alertCtrl: AlertController) {
  }

  async getResult() {
    this.results = await this.chartSelectorServiceProvider.load();
  }

  ionViewDidLoad() {
    this.getResult();
  }
  itemSelected(item: any) {
    let isOk = true;
    for (let entry of item.items) {
      isOk = isOk && entry.tagSelected!="";
    }    
    if(!isOk) {
      this.presentAlert();
    } else {
        this.navCtrl.push(this.chartPage,item);
    }
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Madatory fields',
    subTitle: 'please fill all the fields',
    buttons: ['OK']
  });
  alert.present();
}

}
