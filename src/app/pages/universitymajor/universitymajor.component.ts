import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Major, MajorService } from '../../services/major.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { University, UniversityService } from 'src/app/services/university.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-universitymajor',
  templateUrl: './universitymajor.component.html',
  styleUrls: ['./universitymajor.component.css']
})
export class UniversitymajorComponent implements OnInit {

  universities: University[] = [];
  university: University = {} as University;
  majors: Major[] = [];
  major: Major = {} as Major;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings[] = [];
  dtTriggers: Subject<any>[] = [];
  @ViewChildren(DataTableDirective) dtElements: DataTableDirective[] = [];

  @ViewChild('uniModal') uniModal: ModalDirective;
  @ViewChild('majorModal') majorModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('object') object: ElementRef;

  constructor(private majorService: MajorService, private universityService: UniversityService) { }

  ngOnInit() {
    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.dtTriggers[0] = new Subject();
    this.dtTriggers[1] = new Subject();
    this.loadData();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTriggers.forEach((dtTrigger: Subject<any>, index: number) => {
      dtTrigger.unsubscribe();
    });
  }

  loadData() {
    this.universityService.getUniversities().subscribe(result => {
      this.universities = result.data;
      this.rerender();
    });
    this.majorService.getMajors().subscribe(result => {
      this.majors = result.data;
      this.rerender();
    });
  }

  showModal(kind: string, form: NgForm, event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    form.reset();

    if (id > 0) {
      if (kind === 'university') {
        this.universityService.getUniversity(id).subscribe(result => {
        this.university = result.data;
        this.uniModal.show();
        });
      } else if (kind === 'major') {
        this.majorService.getMajor(id).subscribe(result => {
        this.major = result.data;
        this.majorModal.show();
        });
      }
    } else {
      if (kind === 'university') {
        this.university = {} as University;
        this.uniModal.show();
      } else if (kind === 'major') {
        this.major = {} as Major;
        this.majorModal.show();
      }
    }
  }

  save(kind) {
    if (kind === 'university') {
      if (this.university.id === undefined || this.university.id === 0) {
        this.universityService.addUniversity(this.university).subscribe(result => {
          this.uniModal.hide();
          this.loadData();
          this.alertMessage(result.message);
        });
      } else {
        this.universityService.updateUniversity(this.university).subscribe(result => {
          this.uniModal.hide();
          this.loadData();
          this.alertMessage(result.message);
        });
      }
    } else if (kind === 'major') {
      if (this.major.id === undefined || this.major.id === 0) {
        this.majorService.addMajor(this.major).subscribe(result => {
          this.majorModal.hide();
          this.loadData();
          this.alertMessage(result.message);
        });
      } else {
        this.majorService.updateMajor(this.major).subscribe(result => {
          this.majorModal.hide();
          this.loadData();
          this.alertMessage(result.message);
        });
      }
    }
  }

  showDeleteModal(kind, event, id) {
    if (kind === 'university') {
      this.university.id = id;
      this.object.nativeElement.value = 'university';

    } else if (kind === 'major') {
      this.major.id = id;
      this.object.nativeElement.value = 'major';
    }
    event.preventDefault();
    this.deleteModal.show();
  }

  delete() {
    if (this.object.nativeElement.value === 'university') {
      this.universityService.deleteUniversity(this.university.id).subscribe(result => {
        if (result.errorCode === 0) {
          const deletedUniversity = this.universities.find( x => x.id === this.university.id);
          if (deletedUniversity) {
            const index = this.universities.indexOf(deletedUniversity);
            this.universities.splice(index, 1);
          }
        }
        this.deleteModal.hide();
        this.alertMessage(result.message);
      });
    } else if (this.object.nativeElement.value === 'major') {
      this.majorService.deleteMajor(this.major.id).subscribe(result => {
        if (result.errorCode === 0) {
          const deletedMajor = this.majors.find( x => x.id === this.major.id);
          if (deletedMajor) {
            const index = this.majors.indexOf(deletedMajor);
            this.majors.splice(index, 1);
          }
        }

        this.deleteModal.hide();
        this.alertMessage(result.message);
      });
    }
    this.object.nativeElement.value = '';
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.dtTriggers.forEach((dtTrigger: Subject<any>, index: number) => {
      dtTrigger.next();
    });
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTriggers[index].next();
      });
    });
  }
  alertMessage(message) {
    this.alert.next(message);
  }
}
