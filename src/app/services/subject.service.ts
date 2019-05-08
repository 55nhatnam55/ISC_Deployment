import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

export interface SubjectsResponse {
  data: SubjectInterface[];
  errorCode: number;
  message: string;
}
export interface SubjectResponse {
  data: SubjectInterface;
  errorCode: number;
  message: string;
}
export interface SubjectInterface {
  subjectId: number;
  subjectname: string;
  numberlesson: number;
}
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<SubjectsResponse> {
    return this.http.get<SubjectsResponse>(this.api.apiUrl.subjects);
  }
  get(id): Observable<SubjectResponse> {
    return this.http.get<SubjectResponse>(`${this.api.apiUrl.subjects}/${id}`);
  }
  add(data: SubjectInterface): Observable<SubjectResponse> {
    console.log(data);
    return this.http.post<SubjectResponse>(this.api.apiUrl.subjects, data);
  }
  update(data: SubjectInterface): Observable<SubjectResponse> {
    // const url = this.api.apiUrl.major + '?id=' + data.id;
    const url = `${this.api.apiUrl.subjects}/${data.subjectId}`;
    return this.http.put<SubjectResponse>(url, data);
  }
  delete(id): Observable<SubjectResponse> {
    const url = `${this.api.apiUrl.subjects}/${id}`;
    return this.http.delete<SubjectResponse>(url);
  }
}
