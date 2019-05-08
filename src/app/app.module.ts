import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ClassroomComponent} from './pages/classroom/classroom.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { AddtimetableComponent } from './pages/addtimetable/addtimetable.component';
import { LearningResultComponent } from './pages/learning-result/learning-result.component';
import { CourseComponent } from './pages/course/course.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpecializedTrainingComponent } from './pages/specialized-training/specialized-training.component';

import { ExaminationSubjectComponent } from './pages/examinationsubject/examinationsubject.component';
import { EntranceTestComponent } from './pages/entrancetest/entrancetest.component';

import { LecturerComponent } from './pages/lecturer/lecturer.component';
import { UniversitymajorComponent } from './pages/universitymajor/universitymajor.component';
import { CompanyComponent } from './pages/company/company.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { WorktrackComponent } from './pages/worktrack/worktrack.component';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { DataTablesModule } from 'angular-datatables';
import { Select2Module } from 'ng2-select2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassesComponent } from './pages/classes/classes.component' ;
import { TestResultComponent } from './pages/testresult/testresult.component' ;
import { StudentComponent } from './pages/student/student.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StatisticalComponent } from './pages/statistical/statistical.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ClassroomComponent,
    TimetableComponent,
    AddtimetableComponent,
    LearningResultComponent,
    CourseComponent,
    SpecializedTrainingComponent,

    ExaminationSubjectComponent,
    EntranceTestComponent,

    LecturerComponent,
    UniversitymajorComponent,
    CompanyComponent,
    SubjectComponent,
    WorktrackComponent,
    ClassesComponent,
    TestResultComponent,
    StudentComponent,
    AdminComponent,
    StatisticalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    DataTablesModule,
    Select2Module,
    NgbModule.forRoot(),
    NgxEchartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
