import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ExaminationSubject } from './examinationsubject.service';
import { User, UsersResponse } from './user.service';
import { EntranceTest, EntranceTestResponse, EntranceTestsResponse } from './entrancetest.service';

export interface TestResultsResponse {
  errorCode: number;
  data: TestResult[];
  Message: string;
}
export interface TestResultResponse {
  errorCode: number;
  data: TestResult;
  Message: string;
}
export interface TestResult {
  testResultId: number;
  firstName: string;
  lastName: string;
  score: number;
  subjectName: string;
  testDate: Date;
  courseName: string;
}
@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<TestResultsResponse> {
    return this.http.get<TestResultsResponse>(this.api.apiUrl.testresult);
  }
  get(id): Observable<TestResultResponse> {
    return this.http.get<TestResultResponse>(this.api.apiUrl.testresult + '/' + id);
  }
  getEntrace(id): Observable<EntranceTestsResponse> {
    return this.http.get<EntranceTestsResponse>(this.api.apiUrl.testresult + '/EntranceTest?id=' + id);
  }
  getCourseAndEntrance(course: number, entrance: number): Observable<TestResultsResponse> {
    return this.http.get<TestResultsResponse>(this.api.apiUrl.testresult + '/GetByCoureAndEntrance?CousrseId=' +
    course + '&EntranceId=' + entrance);
  }
  getUserCourseAndEntrance(course: number, entrance: number): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.api.apiUrl.testresult + '/GetUserByCoureAndEntrance?CousrseId=' +
    course + '&EntranceId=' + entrance);
  }
  add(data: TestResult): Observable<TestResultResponse> {
    return this.http.post<TestResultResponse>(this.api.apiUrl.testresult, data);
  }
  update(data: TestResult): Observable<TestResultResponse> {
    const url = `${this.api.apiUrl.testresult}/${data.testResultId}`;
    return this.http.put<TestResultResponse>(url, data);
  }
  delete(id): Observable<TestResultResponse> {
    const url = `${this.api.apiUrl.testresult}/${id}`;
    return this.http.delete<TestResultResponse>(url);
  }
}
