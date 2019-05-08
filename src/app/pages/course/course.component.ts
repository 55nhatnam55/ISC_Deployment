import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Course, CourseService } from 'src/app/services/course.service';
import { SpecialiazedTraining, SpecializedTrainingService } from 'src/app/services/specialized-training.service';
import { DatetimeService } from 'src/app/services/datetime.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  modalRef: BsModalRef;
  test: string;
  course: Course = {} as Course;
  courses: Course [] = [];
  trainings: SpecialiazedTraining[] = [];

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  
  constructor(private courseService: CourseService, private modalService: BsModalService
            , private trainingService: SpecializedTrainingService, private datetimeService: DatetimeService) { }
  ngOnInit() {
    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.loadData();
  }

  loadData() {
    this.courseService.getAll().subscribe(
      result => {
        this.courses = result.data;
        this.rerender();
    });
    this.trainingService.getAll().subscribe(
      result => {
        this.trainings = result.data;
      });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {this.dtTrigger.next(); }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }

  alertMessage(message) {
    this.alert.next(message);
  }

  showModal(event = null, Id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (Id > 0) {
      this.courseService.get(Id).subscribe( result => {
        this.course = result.data;
        this.course.enddate = this.datetimeService.formatDatetimeData(this.course.enddate);
        this.course.startdate = this.datetimeService.formatDatetimeData(this.course.startdate);
        this.modal.show();
      });
    } else {
      this.course = {} as Course;
      this.modal.show();
    }
    this.modal.show();
  }

  save() {
    if (this.course.courseId === undefined || this.course.courseId === 0) {
      this.courseService.add(this.course).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.courseService.update(this.course, this.course.courseId).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }

  showDeleteModal(event, id) {
    this.course.courseId = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  delete(event = null) {
    event.preventDefault();
    this.courseService.delete(this.course.courseId).subscribe(result => {
      const deletedCourse = this.courses.find(x => x.courseId === this.course.courseId);
      if (result.errorCode === 0) {
        const index = this.courses.indexOf(deletedCourse);
        if (deletedCourse) {
          this.courses.splice(index);
        }
      }
    });
    this.deleteModal.hide();
    this.loadData();
  }
}
