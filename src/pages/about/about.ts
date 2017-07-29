import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../configuration/configuration';
import { AboutServiceProvider } from '../../providers/about-service/about-service';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  results : any = 0;
  appVersion : string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public aboutServiceProvider : AboutServiceProvider,
   public configuration : Configuration) {
     this.appVersion = this.configuration.appVersion;
     this.getResult();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  async getResult() {
    this.results = await this.aboutServiceProvider.load();
  }

}
