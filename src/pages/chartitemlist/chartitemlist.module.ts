import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartitemlistPage } from './chartitemlist';

@NgModule({
  declarations: [
    ChartitemlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartitemlistPage),
  ],
  exports: [
    ChartitemlistPage
  ]
})
export class ChartitemlistPageModule {}
