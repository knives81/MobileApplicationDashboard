import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartselectorPage } from './chartselector';

@NgModule({
  declarations: [
    ChartselectorPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartselectorPage),
  ],
  exports: [
    ChartselectorPage
  ]
})
export class ChartselectorPageModule {}
