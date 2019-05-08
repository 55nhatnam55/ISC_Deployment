import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface ExaminationSubjectsResponse {
  errorCode: number;
  data: ExaminationSubject[];
  Message: string;
}
export interface ExaminationSubjectResponse {
  errorCode: number;
  data: ExaminationSubject;
  Message: string;
}
export interface ExaminationSubject {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class ExaminationSubjectService {
  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<ExaminationSubjectsResponse> {
    return this.http.get<ExaminationSubjectsResponse>(this.api.apiUrl.examinationsubject);
  }
  get(id): Observable<ExaminationSubjectResponse> {
    return this.http.get<ExaminationSubjectResponse>(this.api.apiUrl.examinationsubject + '/' + id);
  }
  add(data: ExaminationSubject): Observable<ExaminationSubjectResponse> {
    return this.http.post<ExaminationSubjectResponse>(this.api.apiUrl.examinationsubject, data);
  }
  update(data: ExaminationSubject): Observable<ExaminationSubjectResponse> {
    const url = `${this.api.apiUrl.examinationsubject}/${data.id}`;
    return this.http.put<ExaminationSubjectResponse>(url, data);
  }
  delete(id): Observable<ExaminationSubjectResponse> {
    const url = `${this.api.apiUrl.examinationsubject}/${id}`;
    return this.http.delete<ExaminationSubjectResponse>(url);
  }
}
