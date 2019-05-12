import { Component, OnInit } from '@angular/core';
import { EChartOption,graphic} from 'echarts';
import { StatisService, statistical, statispass } from 'src/app/services/statis.service';
import { CourseService, Course } from 'src/app/services/course.service';
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  
  options: any;
  statics: statistical [];
  chart = [];
  avg = [];
  courseName = [];
  idCourse = [];
  Name =['dau','rot'];
  Pass= [] ;
  Fail= [];
  chartOption: EChartOption;
  chartOptionPass: EChartOption;
  course: Course = {} as Course;
  courses: Course[];
  statisPass: statispass = {} as statispass;
  constructor(private statisService : StatisService, private courseService : CourseService) { }

  ngOnInit() {
    this.statisService.getAll().subscribe(result=>{
      this.statics = result.data;
       this.avg = result.data.map(x=>x.avg);
       this.courseName = result.data.map(x=>x.courseName);
       this.idCourse = result.data.map(x=>x.idCourse);
       this.chartOption={
        color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            
            type : 'shadow'        
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : this.courseName,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'AvgScore',
            type:'bar',
            barWidth: '60%',
            data:this.avg
        }
    ]
       };
    });
    this.loadData();
  }
  
  loadData(){
    this.courseService.getAll().subscribe(result => {
      this.courses = result.data;
    });
  }
  onChangeCourse(newValue){ 
    this.course.courseId = newValue;
    console.log(this.course.courseId);
  }
  search(){
    this.statisService.getPass(this.course.courseId).subscribe(result=>{
      this.Pass = result.data.map(x=>x.pass);
      this.Fail = result.data.map(x=>x.fail);
      this.chartOptionPass = 
      {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:null
        },
        series: [
            {
                name:'Detail',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    this.Pass,
                    this.Fail
                ]
            }
        ]
    };
    });
  }
}
