import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
declare const require: any;
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  // demo_html = require('!!html-loader!./statistical.component.html');
  // demo_ts = require('!!raw-loader!./statistical.component.ts');

  options: any;
  constructor() { }

  ngOnInit() {
  }

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'bar'
    }]
  }
  

}
