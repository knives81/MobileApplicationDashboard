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
   this.isReady = await true;


 }
 ionViewDidLoad() {
   this.getResult(this.confId);
 }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public configuration : Configuration,
    public chartServiceProvider :ChartServiceProvider) {
      this.confId = navParams.get('confId');
    
    Chart.pluginService.register({
	afterDraw: function (chart, easing) {
		if (chart.config.options.showPercentage || chart.config.options.showLabel) {
			var self = chart.config;
			var ctx = chart.chart.ctx;

			ctx.font = '12px Arial';
			ctx.textAlign = "center";
			ctx.fillStyle = "#000";

      //chart.canvas.style.height = '300px';
      //chart.canvas.style.width = '300px';

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
            var label = chart.config.data.labels[idx];

						ctx.fillText(label + ' '+ dataset.data[idx], dx, dy);

            }
				}
				ctx.restore();
			});
		}
	}
});

  }




}
