import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartPage } from './chart';
import {ChartsModule} from 'ng2-charts/charts/charts';

@NgModule({
  declarations: [
    ChartPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(ChartPage),
  ],
  exports: [
    ChartPage
  ]
})
export class ChartPageModule {}
