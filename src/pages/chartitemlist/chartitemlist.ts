import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ChartItemServiceProvider } from '../../providers/chart-item-service/chart-item-service';
import { ChartPage } from '../chart/chart';
/**
 * Generated class for the ChartitemlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chartitemlist',
  templateUrl: 'chartitemlist.html',
  providers: [ChartItemServiceProvider]
})
export class ChartitemlistPage {

  results : any = 0;
  chartPage = ChartPage;
  tag : string = '';




  constructor(public navCtrl: NavController, public navParams: NavParams,
  public chartItemServiceProvider: ChartItemServiceProvider,
  public alertCtrl: AlertController) {

  }

  keyHasBeenPressed(e) {
    if(e.key === 'Enter') {
      this.getResult(this.tag);
    }
  }

  async getResult(tag : string) {
    this.results = await this.chartItemServiceProvider.load(tag);
    if(this.results == "") {
        this.results = 1;
    }
  }

  itemSelected(item: any) {
    console.log("Selected Item", item);
    this.navCtrl.push(this.chartPage,item);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.getResult(this.tag);
  }


}
