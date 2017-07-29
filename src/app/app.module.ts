import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';

import { MyApp } from './app.component';

import { ChartPage } from '../pages/chart/chart';
import { ChartitemlistPage } from '../pages/chartitemlist/chartitemlist';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartItemServiceProvider } from '../providers/chart-item-service/chart-item-service';
import { ChartServiceProvider } from '../providers/chart-service/chart-service';

import { Configuration } from '../configuration/configuration';
import { IonicStorageModule } from '@ionic/storage';
import { TestConfigurationServiceProvider } from '../providers/test-configuration-service/test-configuration-service';

import { SettingsPageModule } from '../pages/settings/settings.module';
import { ChartPageModule } from '../pages/chart/chart.module';
import { AboutPageModule } from '../pages/about/about.module';
import { ChartitemlistPageModule } from '../pages/chartitemlist/chartitemlist.module';
import { AboutServiceProvider } from '../providers/about-service/about-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ChartsModule,
    ChartPageModule,
    ChartitemlistPageModule,
    SettingsPageModule,
    AboutPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChartPage,
    ChartitemlistPage,
    SettingsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChartItemServiceProvider,
    ChartServiceProvider,
    Configuration,
    TestConfigurationServiceProvider,
    AboutServiceProvider
  ]
})
export class AppModule {}
