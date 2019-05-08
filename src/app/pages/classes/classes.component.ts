import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { load } from '@angular/core/src/render3';
import { stringify } from 'querystring';
import { Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap';
import { ClassesService, classeFull, classe } from 'src/app/services/classes.service';
import { Course, CourseService } from 'src/app/services/course.service';
import { SubjectInterface, SubjectService } from 'src/app/services/subject.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  private alert = new Subject<string>();
  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement : DataTableDirective;
  @ViewChild('modalEdit') modalEdit : ModalDirective;
  @ViewChild('modalAdd') modalAdd : ModalDirective;
  @ViewChild('modalDelete') modalDelete : ModalDirective;
  @ViewChild('modalMessage') modalMessage : ModalDirective;
  @ViewChild('modalMessageError') modalMessageError : ModalDirective;

  classeFull: classeFull [];
  classe: classe = {} as classe;
  classes: classe [];
  courses: Course [];
  course: Course = {} as Course;
  subjects: SubjectInterface[];
  subject: SubjectInterface = {} as SubjectInterface;
  message: string;
  messageError: string;
  constructor(private classesService : ClassesService, private courseService : CourseService, private subjectService : SubjectService) { }

  ngOnInit() {
    this.alert.subscribe((message) => this.message = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.message = null);
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength: 10
    };
    this.loadData();
  }

  alertMessage(message) {
    this.alert.next(message);
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  loadData(){
    this.classesService.getall().subscribe(result=>{
      this.classeFull = result.data;
      this.rerender();
    });
  }

  showModalAdd(event = null){
    this.getCourses_Subjects();
    this.classe = {} as classe;
    this.modalAdd.show();
  }

  showModalEdit(event = null, id: number = 0) {
    this.loadData();
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.classesService.get(id).subscribe(result => {
      this.classe = result.data;
      this.courseService.get(this.classe.courseid).subscribe(res=>{
        this.course = res.data;
      });
      this.subjectService.get(this.classe.subjectid).subscribe(res=>{
        this.subject = res.data;
      });
      this.getCourses_Subjects();
      });
      this.modalEdit.show();
  }
}

showModalDelete(event = null, id: number){
  if (event) {
    event.preventDefault();
  }
  this.classe.id = id;
  this.modalDelete.show();
}

  getCourses_Subjects(): void{
    this.courseService.getAll().subscribe(result=>{
      this.courses = result.data;
      });
    this.subjectService.getAll().subscribe(result=>{
      this.subjects = result.data;
    });
  }

  save(){
    if (this.classe.id === undefined || this.classe.id === 0) {
      if(this.classe.name === undefined || this.classe.percentBan === undefined 
        ||this.course.courseId === null || this.subject.subjectId === null)
      {
        this.modalMessage.show();
      }
      else{
        this.classe.isdelete = false;
        this.classesService.add(this.classe).subscribe(result => {
        if(result.errorCode === 0){
          this.loadData();
          this.modalAdd.hide();
          this.alertMessage(result.message);
        }else{
          this.messageError = result.message;
          this.modalMessageError.show();
        }
      });
      }
    }else if(this.classe.name === undefined || this.classe.percentBan === undefined 
      ||this.course.courseId === null || this.subject.subjectId === null)
      {
        this.modalMessage.show();
      }
     else {
        this.classesService.update(this.classe).subscribe(result => {
          if(result.errorCode === 0){
            this.loadData();
            this.modalEdit.hide();
            this.alertMessage(result.message);
          }else{
            this.messageError = result.message;
            this.modalMessageError.show();
          }
      });
    }
  }

  delete(event = null, id) {
    event.preventDefault();
    this.classesService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const delelteClass = this.classeFull.find(x => x.id === id);
        if (delelteClass) {
          const index = this.classeFull.indexOf(delelteClass);
          this.classeFull.splice(index, 1);
        this.loadData();
        this.modalDelete.hide();
         }
      };
    });
    this.classe.id = null;
  }

  onChangeCourse(newValue){ 
    this.classe.courseid = newValue;
}
  onChangeSubject(newValue){ 
    this.classe.subjectid = newValue;
  }

  //dataTable
  ngAfterViewInit(): void{
    this.dtTrigger.next();
  }
  rerender(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
