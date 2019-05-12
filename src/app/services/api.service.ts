import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'https://iscsystem.azurewebsites.net/api/';
  apiUrl = {
    academic: this.baseUrl + 'academics',
    admins: this.baseUrl + 'admins',
    companies: this.baseUrl + 'companies',
    degree: this.baseUrl + 'degrees',
    examinationsubject: this.baseUrl + 'examinationsubjects',
    entrancetest: this.baseUrl + 'entrancetests',
    classroom: this.baseUrl + 'classroom',
    course: this.baseUrl + 'courses',
    learnresult: this.baseUrl + 'LearnResult',
    lecturer: this.baseUrl + 'lecturers',
    login: this.baseUrl + 'admin/login',
    trainingsubject: this.baseUrl + 'trainingsubjects',
    major: this.baseUrl + 'majors',
    specializedtraining: this.baseUrl + 'specializedtrainings',
    subjects: this.baseUrl + 'subjects',
    user: this.baseUrl + 'users',
    university: this.baseUrl + 'universities',
    worktracks: this.baseUrl + 'worktracks',
    classes: this.baseUrl + 'classes',
    testresult: this.baseUrl + 'TestResults',
    student: this.baseUrl + 'students',
    statis: this.baseUrl + 'statistical'
  };
}
