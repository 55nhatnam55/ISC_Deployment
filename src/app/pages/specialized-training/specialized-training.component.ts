import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SpecialiazedTraining, SpecializedTrainingService } from 'src/app/services/specialized-training.service';
import { SubjectService, SubjectInterface } from 'src/app/services/subject.service';
import { TrainingSubject, TrainingsubjectService } from 'src/app/services/trainingsubject.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-specialized-training',
  templateUrl: './specialized-training.component.html',
  styleUrls: ['./specialized-training.component.css']
})
export class SpecializedTrainingComponent implements OnInit {

  modalRef: BsModalRef;
  test: string;
  specializedTraining: SpecialiazedTraining = {} as SpecialiazedTraining;
  specializedTrainings: SpecialiazedTraining[] = [];
  subjects: SubjectInterface[] = [];
  subject: SubjectInterface = {} as SubjectInterface;
  selectedSubjects: SubjectInterface[] = [];
  trainingSubject: TrainingSubject = {} as TrainingSubject;
  listTrainingSubjectsDeleted: number[] = [];

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private sptrainingService: SpecializedTrainingService,
     private subjectService: SubjectService, private trainingSubjectService: TrainingsubjectService,
     private modalService: BsModalService) { }

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
    this.sptrainingService.getAll().subscribe(
      result => {
        this.specializedTrainings = result.data;
        this.rerender();
    });
    this.subjectService.getAll().subscribe(
      result => {
        this.subjects = result.data;
      }
    );
  }

  showModal(event = null, TrainingId: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (TrainingId > 0) {
      this.sptrainingService.get(TrainingId).subscribe( result => {
        this.specializedTraining = result.data;
        this.selectedSubjects = this.specializedTraining.listSubjects;
        this.modal.show();
      });
    } else {
      this.specializedTraining = {} as SpecialiazedTraining;
      this.selectedSubjects = [] as SubjectInterface[];
      this.modal.show();
    }
    this.modal.show();
  }

  save() {
    if (this.specializedTraining.trainingId === undefined || this.specializedTraining.trainingId === 0) {
      this.sptrainingService.add(this.specializedTraining).subscribe(result => {
        this.sptrainingService.getTheLast().subscribe(resultt => {
          if (this.selectedSubjects.length > 0) {
            this.selectedSubjects.forEach(item => {
              const trainingSubject = {} as TrainingSubject;
              trainingSubject.subjectId = item.subjectId;
              trainingSubject.trainingId = resultt.data.trainingId;
              this.trainingSubjectService.add(trainingSubject).subscribe(result => {
                this.loadData();
              });
            });
          }
          this.alertMessage(result.message);
        });
        this.modal.hide();
      });
    } else {
      this.sptrainingService.update(this.specializedTraining, this.specializedTraining.trainingId).subscribe(result => {
        if (this.listTrainingSubjectsDeleted.length > 0) {
          this.listTrainingSubjectsDeleted.forEach(item => {
            this.deleteSelectedSubject(item);
          });
          this.listTrainingSubjectsDeleted = [] as number[];
          this.loadData();
        }
        if (this.selectedSubjects.length > 0) {
          this.selectedSubjects.forEach(item => {
              let isExist: boolean = false;
              const addSubject = {} as TrainingSubject;
              addSubject.subjectId = item.subjectId;
              addSubject.trainingId = this.specializedTraining.trainingId;
              this.trainingSubjectService.getTrainingSubject(addSubject).subscribe(result => {
                if(result.data !== undefined) { isExist = true; }
                if (!isExist) {
                  this.trainingSubjectService.add(addSubject).subscribe(result => {
                    this.alertMessage(result.message);
                    this.loadData();
                  });
                }
              });
            });
          this.selectedSubjects = null;
        } else {
          this.trainingSubjectService.deleteAllByTrainingId(this.specializedTraining.trainingId).subscribe(result => {
            this.alertMessage(result.message);
            this.loadData();
          });
        }
        this.modal.hide();
      });
    }
  }

  showDeleteModal(event, id) {
    this.specializedTraining.trainingId = id;
    this.sptrainingService.get(id).subscribe( result => {
      this.specializedTraining.listSubjects =  result.data.listSubjects;
      this.alertMessage(result.message);
    });
    event.preventDefault();
    this.deleteModal.show();
  }

  delete(event = null) {
    event.preventDefault();
    if(this.specializedTraining.listSubjects.length > 0)
    {
      this.trainingSubjectService.deleteAllByTrainingId(this.specializedTraining.trainingId).subscribe(result => {
        this.sptrainingService.delete(this.specializedTraining.trainingId).subscribe(item => {
          const deletedTraining = this.specializedTrainings.find(x => x.trainingId === this.specializedTraining.trainingId);
          if (item.errorCode === 0) {
            const index = this.specializedTrainings.indexOf(deletedTraining);
            if (deletedTraining) {
              this.specializedTrainings.splice(index);
            }
          }
          this.alertMessage(result.message);
        });
      });
    } else {
      this.sptrainingService.delete(this.specializedTraining.trainingId).subscribe(result => {
        const deletedTraining = this.specializedTrainings.find(x => x.trainingId === this.specializedTraining.trainingId);
        if (result.errorCode === 0) {
          const index = this.specializedTrainings.indexOf(deletedTraining);
          if (deletedTraining) {
            this.specializedTrainings.splice(index);
          }
        }
        this.alertMessage(result.message);
      });
    }
    this.deleteModal.hide();
  }

  addSubjectToTraining(data: SubjectInterface) {
      this.selectedSubjects.push(data);
  }

  // Xoa mon hoc khoi danh sach mon hoc cua chuong trinh hoc tren modal
  removeFromSelectedSubjects(index) {
    const deleteSubjectId = this.selectedSubjects[index].subjectId;
    const item = {} as TrainingSubject;
    item.subjectId = deleteSubjectId;
    item.trainingId = this.specializedTraining.trainingId;
    this.selectedSubjects.splice(index, 1); // Xoa khoi selectedSubject
    this.trainingSubjectService.getTrainingSubject(item).subscribe(result => {
      if (result.data !== null) {  // Neu subject da co trong db TrainingSubject thi them Id vao listDelete
        this.listTrainingSubjectsDeleted.push(result.data.trainingSubjectId);
      }
    });
  }

  deleteSelectedSubject(TrainingSubjectId) {
    this.trainingSubjectService.delete(TrainingSubjectId).subscribe(result => {
        this.loadData();
    });
  }

  checkSelectedSubject(id) {
    this.subjectService.get(id).subscribe(
      result => {
        const index = this.selectedSubjects.filter(function(el) {
          if (el.subjectId === id) {
            return el;
          }
        });
        if (index.length > 0) {
          alert('Subject has existed in list selected subjects!');
        } else {
          this.addSubjectToTraining(result.data);
        }
      }
    );
  }
}
