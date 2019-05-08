import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Admin, AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins: Admin[] = [];
  admin: Admin = {} as Admin;
  Data: FormData = {} as FormData;
  confirm_password: string;


   private alert = new Subject<string>();
   successMessage: string;

   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject();
   @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    $('#txtPassword, #txtConfirmPassword').on('keyup', () => {
      if ($('#txtPassword').val() === $('#txtConfirmPassword').val()) {
      $('#message').html('Matching').css('color', 'green');
      } else {
      $('#message').html('Not Matching').css('color', 'red');
      }
    });
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
    this.adminService.getAll().subscribe(result => {
      this.admins = result.data;
      // this.modal.show();
    });
  }
  showModal($event = null, id: number = 0) {
    if (event) {
      event.preventDefault();
    }
    if (id > 0) { // Show GUI for Update
      this.adminService.get(id).subscribe(result => {
        this.admin = result.data;
        this.modal.show();
      });
    } else {  // Show GUI for Add new
      this.admin = {} as Admin;
      this.modal.show();
    }
  }
  showDeleteModal($event, id) {
    if (event) {
      event.preventDefault();
    }
    this.admin.adminid = id;
    this.deleteModal.show();
  }

  save() {
    if (this.admin.adminid === undefined || this.admin.adminid === 0) {
      this.Data = new FormData();
      this.Data.append('Image', this.admin.image);
      this.Data.append('Username', this.admin.username);
      this.Data.append('Password', this.admin.password);
      this.Data.append('Fullname', this.admin.fullname);
      this.adminService.add(this.Data).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    } else {
      this.adminService.update(this.admin).subscribe(result => {
        this.modal.hide();
        this.loadData();
      });
    }
  }

  delete(id) {
    this.adminService.delete(id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteCompany = this.admins.find(x => x.adminid === id);
        if (deleteCompany) {
          const index = this.admins.indexOf(deleteCompany);
          this.admins.splice(index, 1);
          this.deleteModal.hide();
        }
      }
    });
  }
 
  handleFileInput(files: FileList) {
    this.admin.image = files.item(0);
  }
}
