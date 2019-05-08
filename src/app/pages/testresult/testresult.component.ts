import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TestResult, TestResultService } from 'src/app/services/testresult.service';
import { ExaminationSubject, ExaminationSubjectService } from 'src/app/services/examinationsubject.service';
import { User, UserService } from 'src/app/services/user.service';
import { EntranceTest, EntranceTestService } from 'src/app/services/entrancetest.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Course, CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-testresult',
  templateUrl: './testresult.component.html',
  styleUrls: ['./testresult.component.css']
})
export class TestResultComponent implements OnInit {
  testresults: TestResult[] = [];
  testresult: TestResult = {} as TestResult;
  examinationsubjects: ExaminationSubject[] = [];
  examinationsubject: ExaminationSubject = {} as ExaminationSubject;
  users: User[] = [];
  user: User = {} as User;
  entrancetests: EntranceTest[] = [];
  entrancetest: EntranceTest = {} as EntranceTest;
  courses: Course[] = [];
  coursesEdit: Course[] = [];
  course: Course = {} as Course;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  // tslint:disable-next-line:max-line-length
  constructor(private testresultService: TestResultService, private examinationsubjectService: ExaminationSubjectService, private entrancetestService: EntranceTestService, private userService: UserService, private courseService: CourseService)  {  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loadData();
  }
  loadData() {
    this.testresultService.getAll().subscribe(result => {
      this.testresults = result.data;
      this.rerender();
    });
    this.courseService.getAll().subscribe(result => {
      this.courses = result.data;
    });
    this.examinationsubjectService.getAll().subscribe(result => {
      this.examinationsubjects = result.data;
    });
  }
  search() {
    this.testresultService.getCourseAndEntrance(this.course.courseId, this.entrancetest.id).subscribe(res => {
      this.testresults = res.data;
    });
  }
  onChangeCourse(newValue) {
    this.course.courseId = newValue;
    this.testresultService.getEntrace(newValue).subscribe(res => {
      this.entrancetests = res.data;
    });
  }
  onChangeUser(newValue) {
    this.user.id = newValue;
  }
  onChangeSubject(newValue) {
    this.examinationsubject.id = newValue;
  }
  onChangeEntranceTest(newValue) {
    this.entrancetest.id = newValue;
    this.testresultService.getUserCourseAndEntrance(this.course.courseId, this.entrancetest.id).subscribe(res =>{
      this.users = res.data;
    });
  }
  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.testresultService.get(id).subscribe(result => {
        this.testresult = result.data;
        this.testresult.testResultId = id;
        this.modal.show();
      });
    } else {
      this.testresult = {} as TestResult;
      this.modal.show();
    }
  }
  save() {
    if (this.testresult.testResultId === undefined || this.testresult.testResultId === 0) {
      this.testresultService.add(this.testresult).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.testresultService.update(this.testresult).subscribe(result => {
        this.modal.hide();
        this.search();
      });
    }
  }
  showDeleteModal(event, id) {
    this.testresult.testResultId = id;
    event.preventDefault();
    this.deleteModal.show();
  }
  delete() {
    this.testresultService.delete(this.testresult.testResultId).subscribe(result => {
      if (result.errorCode === 0) {
        const deletedTestResult = this.testresults.find( x => x.testResultId === this.testresult.testResultId);
        if (deletedTestResult) {
          const index = this.testresults.indexOf(deletedTestResult);
          this.testresults.splice(index, 1);
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

