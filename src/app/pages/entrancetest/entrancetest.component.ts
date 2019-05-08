import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EntranceTest, EntranceTestService } from 'src/app/services/entrancetest.service';
import { Course, CourseService } from 'src/app/services/course.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatetimeService } from 'src/app/services/datetime.service';

@Component({
  selector: 'app-entracetest',
  templateUrl: './entrancetest.component.html',
  styleUrls: ['./entrancetest.component.css']
})
export class EntranceTestComponent implements OnInit {
  entrancetests: EntranceTest[] = [];
  entrancetest: EntranceTest = {} as EntranceTest;
  test: string;
  courses: Course[] = [];
  course: Course = {} as Course;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  // tslint:disable-next-line:max-line-length
  constructor(private entrancetestService: EntranceTestService, private courseService: CourseService, public datetimeService: DatetimeService)  {  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadData();
  }
  loadData() {
    this.entrancetestService.getAll().subscribe(result => {
      this.entrancetests = result.data;
    });
    this.courseService.getAll().subscribe(result => {
      this.courses = result.data;
    });
    this.rerender();
  }
  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.entrancetestService.get(id).subscribe(result => {
        this.entrancetest = result.data;
        this.entrancetest.testdate = this.datetimeService.formatDatetimeData(this.entrancetest.testdate);
        this.modal.show();
      });
    } else {
      this.entrancetest = {} as EntranceTest;
      this.modal.show();
      console.log(this.entrancetest);
    }
    console.log(id);
  }
  save() {
    if (this.entrancetest.id === undefined || this.entrancetest.id === 0) {
      this.entrancetestService.add(this.entrancetest).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.entrancetestService.update(this.entrancetest).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  showDeleteModal(event, id) {
    this.entrancetest.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }
  delete() {
    this.entrancetestService.delete(this.entrancetest.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deletedEntranceTest = this.entrancetests.find( x => x.id === this.entrancetest.id);
        if (deletedEntranceTest) {
          const index = this.entrancetests.indexOf(deletedEntranceTest);
          this.entrancetests.splice(index, 1);
        }
        this.deleteModal.hide();
      }
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {this.dtTrigger.next(); }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }
}

