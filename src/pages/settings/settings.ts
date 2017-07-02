import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Configuration } from '../../configuration/configuration';
import { TestConfigurationServiceProvider } from '../../providers/test-configuration-service/test-configuration-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  serverUrl : string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public testConfigurationServiceProvider : TestConfigurationServiceProvider,
   public configuration : Configuration,
   private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.serverUrl = this.configuration.server;
  }
  save() {
    this.configuration.saveServer(this.serverUrl);
    this.presentToast();

  }
  testConfiguration() {
    this.testConfigurationServiceProvider.getHealth(this.serverUrl)
    .then((value) => {console.log('success'+value);})
    .catch((err)=>{console.log('error'+err);});
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Server Url saved successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
