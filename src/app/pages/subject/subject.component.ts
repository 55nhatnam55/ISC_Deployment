import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SubjectService, SubjectInterface } from 'src/app/services/subject.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: SubjectInterface[] = [];
  subject: SubjectInterface = {} as SubjectInterface;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private subjectService: SubjectService) { }

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
     this.subjectService.getAll().subscribe(result => {
        this.subjects = result.data;
        this.rerender();
      });
  }

  showModal(event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) {
      this.subjectService.get(id).subscribe(result => {
        this.subject = result.data;
        this.modal.show();
      });
    } else {
      this.subject = {} as SubjectInterface;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    if (event) {
      event.preventDefault();
    }
    this.subject.subjectId = id;
    this.deleteModal.show();
  }

  save() {
    if (this.subject.subjectId === undefined || this.subject.subjectId === 0) {
      this.subjectService.add(this.subject).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.subjectService.update(this.subject).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }
  delete(id) {
    event.preventDefault();
    this.subjectService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteSubject = this.subjects.find(x => x.subjectId === id);
        if (deleteSubject) {
          const index = this.subjects.indexOf(deleteSubject);
          this.subjects.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
}
