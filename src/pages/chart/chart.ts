import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartServiceProvider } from '../../providers/chart-service/chart-service';
import { Configuration } from '../../configuration/configuration';
import { Chart } from 'chart.js';

//declare var Chart: any;
/**
 * Generated class for the ChartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
  providers: [ChartServiceProvider]
})
export class ChartPage {

	
  isReady: boolean = false;
  results : any = 0;
  chartLegend: boolean = true;

  public chartType: string = 'line';
  public chartLabels: Array<string> = ['January', 'February', 'March'];
  public chartDatasets: Array<any> = [{"data":[63,16,5],"label":"line1"}];

  public chartOptions: any = {
		legend: {
			display: true,
      position: "bottom"
		},
    tooltips: {
			enabled: true,
		},
    showLabel: true,
    responsive:true,
    animation: { animateScale: true, animateRotate: true },
    maintainAspectRatio: false
	}

  confId : number;

  chartColors: Array<any> = [
   { // first color
     borderColor: ['rgba(0,176,80,1)']
   }
 ];
 async getResult(confId : number) {
   this.results = await this.chartServiceProvider.load(confId);
   this.chartDatasets = await this.results.data.datasets;
   this.chartLabels = await this.results.data.labels;
   this.chartColors = await  this.results.colors;
   this.chartType = await this.results.type;
   this.chartOptions = await this.results.options;
   this.isReady = await true;
 }
 async getResult2(selector : any) {
   this.results = await this.chartServiceProvider.loadBySelector(selector);
   this.chartDatasets = await this.results.data.datasets;
   this.chartLabels = await this.results.data.labels;
   this.chartColors = await  this.results.colors;
   this.chartType = await this.results.type;
   this.chartOptions = await this.results.options;
   this.isReady = await true;
 }
 ionViewDidLoad() {
   if(this.navParams.get('confId')==null) {
     this.getResult2(this.navParams);
   } else {
     this.getResult(this.navParams.get('confId'));
   }
 }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public configuration : Configuration,
    public chartServiceProvider :ChartServiceProvider) {

    Chart.pluginService.register({
	afterDraw: function (chart, easing) {
		if (chart.config.options.showPercentage || chart.config.options.showLabel) {

			var self = chart.config;
			var ctx = chart.chart.ctx;
			ctx.textAlign = "center";
			
			//------------------------
			
      	var fontStyle = 'Arial';
				var txt = chart.config.options.customInfo.text;
        var color = chart.config.options.customInfo.color;
        var sidePadding = 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;
        
				//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);

				//Set font settings to draw it correctly.
        
        ctx.textBaseline = 'middle';
        var centernX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centernY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
				ctx.fillStyle = color;
				
				ctx.fillText(txt, centernX, centernY);


			//--------------------

			ctx.font = '12px Arial';
			ctx.fillStyle = "#000";		
			ctx.textBaseline = 'middle';
			


			self.data.datasets.forEach(function (dataset, datasetIndex) {
				var total = 0, //total values to compute fraction
					labelxy = [],
					offset = Math.PI / 2, //start sector from top
					radius,
					centerx,
					centery,
					lastend = 0; //prev arc's end line: starting with 0

				for (var val of dataset.data) {

          total += val;
        }

				var i = 0;
				var meta = dataset._meta[i];
				while(!meta) {
					i++;
					meta = dataset._meta[i];
				}


				var element;
        var index;
				for(index = 0; index < meta.data.length; index++) {

					element = meta.data[index];
					//radius = 0.9 * element._view.outerRadius - element._view.innerRadius;
          radius = element._view.innerRadius + (element._view.outerRadius - element._view.innerRadius)*0.9;
					centerx = element._model.x;
					centery = element._model.y;
					
					var thispart = dataset.data[index],
						arcsector = Math.PI * (2 * thispart / total);
					if (element.hasValue() && dataset.data[index] > 0) {
					  labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
					}
					else {
					  labelxy.push(-1);
					}
					lastend += arcsector;
				}


				var lradius = radius;
				
				for (var idx in labelxy) {

					if (labelxy[idx] === -1) continue;
					var langle = labelxy[idx],
					dx = centerx + lradius * Math.cos(langle),
					dy = centery + lradius * Math.sin(langle),
					val2 = Math.round(dataset.data[idx] / total * 100);
					if (chart.config.options.showPercentage)
						ctx.fillText(val2 + '%', dx, dy);
					else {
            //var label = chart.config.data.labels[idx];
						ctx.fillText(dataset.data[idx], dx, dy);
						
            }
				}
				ctx.restore();
			});
		}
	}
});

  }




}
