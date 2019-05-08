import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './pages/course/course.component';
import { SpecializedTrainingComponent } from './pages/specialized-training/specialized-training.component';
import { ExaminationSubjectComponent } from './pages/examinationsubject/examinationsubject.component';
import { EntranceTestComponent } from './pages/entrancetest/entrancetest.component';
import {  } from 'rxjs';
import { LecturerComponent } from './pages/lecturer/lecturer.component';
import { UniversitymajorComponent } from './pages/universitymajor/universitymajor.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { AddtimetableComponent } from './pages/addtimetable/addtimetable.component';
import { LearningResultComponent } from './pages/learning-result/learning-result.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { CompanyComponent } from './pages/company/company.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { WorktrackComponent } from './pages/worktrack/worktrack.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ClassesComponent } from './pages/classes/classes.component';
import { TestResultComponent } from './pages/testresult/testresult.component';
import { StudentComponent } from './pages/student/student.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StatisticalComponent } from './pages/statistical/statistical.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Login Page' }},
  {
    path: '', component: DashboardComponent, data: { title: 'Home' },
    canActivate: [AuthGuard], // linh canh DANG NHAP
  children: [
    // {path: 'dashboard', component: DashboardComponent},
    {path: 'course', component: CourseComponent},
    {path: 'sptraining', component: SpecializedTrainingComponent},
    {path: 'examinationsubject', component: ExaminationSubjectComponent},
    {path: 'entrancetest', component: EntranceTestComponent},
    {path: 'lecturer', component: LecturerComponent},
    {path: 'university', component: UniversitymajorComponent},
    {path: 'timetable', component: TimetableComponent},
    {path: 'addtimetable', component: AddtimetableComponent},
    {path: 'learnresult', component: LearningResultComponent},
    {path: 'classroom', component: ClassroomComponent},
    {path: 'company', component: CompanyComponent},
    {path: 'subject', component: SubjectComponent},
    {path: 'worktrack', component: WorktrackComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'classes', component: ClassesComponent},
    {path: 'testresult', component: TestResultComponent},
    {path: 'student', component: StudentComponent},
    {path: 'Statistical', component: StatisticalComponent},
    
  ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
