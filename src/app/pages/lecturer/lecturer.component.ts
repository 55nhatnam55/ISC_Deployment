import { Component, OnInit, ViewChild } from '@angular/core';
import { LecturersService, Lecturer, LecturerFull } from '../../services/lecturers.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService, User } from '../../services/user.service';
import { DegreeService, Degree } from '../../services/degree.service';
import { AcademicService, Academic } from '../../services/academic.service';
import { DatetimeService } from '../../services/datetime.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})

export class LecturerComponent implements OnInit {

  degrees: Degree[] = [];
  academics: Academic[] = [];
  user: User = {gender: 1} as User;
  lecturers: LecturerFull[] = [];
  lecturer: Lecturer = {} as Lecturer;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

// tslint:disable-next-line: max-line-length
  constructor(public datetimeService: DatetimeService, public academicService: AcademicService, public degreeService: DegreeService, public lecturerService: LecturersService, public userService: UserService) {
  }

  ngOnInit() {
    this.user = {gender: 1} as User;

    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.degreeService.getDegrees().subscribe(result => {
      this.degrees = result.data;
    });
    this.academicService.getAcademics().subscribe(result => {
      this.academics = result.data;
    });
    this.loadData();
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  showModal(form: NgForm, event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    form.reset();

    if (id > 0) {
      this.lecturerService.getLecturer(id).subscribe(result => {
        this.lecturer = result.data;
        this.lecturer.startday = this.datetimeService.formatDatetimeData(this.lecturer.startday);
        this.userService.getUser(this.lecturer.usE_USERID).subscribe(aresult => {
          this.user = aresult.data;
          this.user.dob = this.datetimeService.formatDatetimeData(this.user.dob);
          this.modal.show();
        });
      });
    } else {
      this.lecturer = {} as Lecturer;
      this.user = {gender: 1} as User;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    this.lecturer.userid = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  loadData() {
    this.lecturerService.getLecturers().subscribe(result => {
      this.lecturers = result.data;
      this.rerender();
    });
  }

  save() {
    if (this.lecturer.userid === undefined || this.lecturer.userid === 0) {
      this.user.isStudent = false;
      this.userService.addUser(this.user).subscribe(result => {
        this.lecturer.usE_USERID = result.data.id;
        this.lecturerService.addLecturer(this.lecturer).subscribe(aresult => {
          this.modal.hide();
          this.loadData();
          this.alertMessage(aresult.message);
        });
      });

    } else {
      this.user.isStudent = false;
      this.userService.updateUser(this.user).subscribe( result => {
        this.lecturerService.updateLecturer(this.lecturer).subscribe(aresult => {
          this.modal.hide();
          this.loadData();
          this.alertMessage(aresult.message);
        });
      });
    }
  }

  delete() {
    this.lecturerService.deleteLecturer(this.lecturer.userid).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteLecturer = this.lecturers.find( x => x.userid === this.lecturer.userid);
        if (deleteLecturer) {
          const index = this.lecturers.indexOf(deleteLecturer);
          this.lecturers.splice(index, 1);
        }
        this.deleteModal.hide();
        this.alertMessage(result.message);
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

  alertMessage(message) {
    this.alert.next(message);
  }
}
