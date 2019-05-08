import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Worktrack, WorktrackInfo, WorktrackService } from 'src/app/services/worktrack.service';
import { DatetimeService } from 'src/app/services/datetime.service';
import { CompanyService, Company } from 'src/app/services/company.service';
import { StudentService, Student, StudentFull} from 'src/app/services/student.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-worktrack',
  templateUrl: './worktrack.component.html',
  styleUrls: ['./worktrack.component.css']
})
export class WorktrackComponent implements OnInit {

  worktrack: Worktrack = {} as Worktrack;
  worktracks: WorktrackInfo[] = [];
  company: Company = {} as Company;
  companies: Company[] = [];
  students: StudentFull[] = [];
  companyname: string;
  studentname: string;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private worktrackService: WorktrackService, private datetimeService: DatetimeService,
              private companyService: CompanyService, private studentService: StudentService) { }

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

  loadData() {
    this.worktrackService.getAll().subscribe(result => {
      this.worktracks = result.data;
      this.rerender();
    });
    this.companyService.getAll().subscribe(result => {
      this.companies = result.data;
    });
    this.studentService.getStudents().subscribe(result => {
      this.students = result.data;
    });
  }

  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.worktrackService.get(id).subscribe(result => {
        this.worktrack = result.data;
        this.worktrack.startdate = this.datetimeService.formatDatetimeData(this.worktrack.startdate);
        this.worktrack.contractdate = this.datetimeService.formatDatetimeData(this.worktrack.contractdate);
        this.modal.show();
      });
    } else {
      this.worktrack = {} as Worktrack;
      this.modal.show();
    }
  }
  
  selectCompanyName() {
    this.companyService.getAll().subscribe(result => { this.companies = result.data; });
  }

  showDeleteModal(event = null, id) {
    if (event) {
      event.preventDefault();
    }
    this.worktrack.id = id;
    this.deleteModal.show();
  }
  save() {
    if (this.worktrack.id === undefined || this.worktrack.id === 0) {
      this.worktrackService.add(this.worktrack).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.worktrackService.update(this.worktrack).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  delete(id) {
    event.preventDefault();
    this.worktrackService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.worktracks.find(x => x.id === id);
        if (deleteCompany) {
          const index = this.worktracks.indexOf(deleteCompany);
          this.worktracks.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
}
