import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { Company, CompanyService } from 'src/app/services/company.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[] = [];
  company: Company = {} as Company;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private companyService: CompanyService) { }

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
    this.companyService.getAll().subscribe(result => {
      this.companies = result.data;
      this.rerender();
    });
  }
  showModal($event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) { // Show GUI for Update
      this.companyService.get(id).subscribe(result => {
        this.company = result.data;
        this.modal.show();
      });
    } else {  // Show GUI for Add new
      this.company = {} as Company;
      this.modal.show();
    }
  }
  showDeleteModal($event, id) {
    if (event) {
      event.preventDefault();
    }
    this.company.id = id;
    this.deleteModal.show();
  }

  save() {
    if (this.company.id === undefined || this.company.id === 0) {
      this.companyService.add(this.company).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.companyService.update(this.company).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }

  delete(id) {
    this.companyService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.companies.find(x => x.id === id);
        if (deleteCompany) {
          const index = this.companies.indexOf(deleteCompany);
          this.companies.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
}
