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
import { ChartselectorPage } from '../pages/chartselector/chartselector';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartItemServiceProvider } from '../providers/chart-item-service/chart-item-service';
import { ChartServiceProvider } from '../providers/chart-service/chart-service';

import { Configuration } from '../configuration/configuration';
import { Util } from '../configuration/util';
import { IonicStorageModule } from '@ionic/storage';
import { TestConfigurationServiceProvider } from '../providers/test-configuration-service/test-configuration-service';

import { SettingsPageModule } from '../pages/settings/settings.module';
import { ChartPageModule } from '../pages/chart/chart.module';
import { AboutPageModule } from '../pages/about/about.module';
import { ChartitemlistPageModule } from '../pages/chartitemlist/chartitemlist.module';
import { ChartselectorPageModule } from '../pages/chartselector/chartselector.module';
import { AboutServiceProvider } from '../providers/about-service/about-service';
import { ChartSelectorServiceProvider } from '../providers/chart-selector-service/chart-selector-service';

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
    ChartselectorPageModule,
    AboutPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChartPage,
    ChartitemlistPage,
    ChartselectorPage,
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
    Util,
    TestConfigurationServiceProvider,
    AboutServiceProvider,
    ChartSelectorServiceProvider
  ]
})
export class AppModule {}
