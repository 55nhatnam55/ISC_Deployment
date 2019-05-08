import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable, Subject, from } from 'rxjs';
import { Course } from './course.service';
import {SubjectInterface} from './subject.service'
export interface classeFullsRespone{
  errorCode: number;
  data: classeFull [];
  message: string;
}
export interface classesRespone{
  errorCode: number;
  data: classe[];
  message: string;
}
export interface classeRespone{
  errorCode: number;
  data: classe;
  message: string;
}
export interface classeFull{
  id: number;
  courseid: number;
  subjectid:number;
  name: string;
  percentBan: number;
  passingscore: number;
  isdelete: boolean;
  course: Course;
  subject: SubjectInterface;
}
export interface classe{
  id: number;
  courseid: number;
  subjectid:number;
  name: string;
  percentBan: number;
  passingscore: number;
  isdelete: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private api: ApiService) { }

  getall(): Observable<classeFullsRespone>{
    return this.http.get<classeFullsRespone>(this.api.apiUrl.classes);
  }
  get(id):Observable<classeRespone>{
    return this.http.get<classeRespone>(this.api.apiUrl.classes + '/' + id);
  }
  
  getCourse(id):Observable<classesRespone>{
    return this.http.get<classesRespone>(this.api.apiUrl.classes + '/GetCourse?id=' + id);
  }
  
  add(data : classe):Observable<classeRespone>{
    return this.http.post<classeRespone>(this.api.apiUrl.classes,data);
  }
  update(data : classe):Observable<classeRespone>{
    const url = this.api.apiUrl.classes + '/' + data.id;
    return this.http.put<classeRespone>(url,data);
  }
  delete(id):Observable<classeRespone>{
    const url = this.api.apiUrl.classes + '/' + id;
    return this.http.delete<classeRespone>(url);
  }
  
}
