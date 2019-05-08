import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface LearnResultsRespone{
  errorCode:number;
  data:LearnResult [];
  Message:string;
}
export interface LearnResultRespone{
  errorCode:number;
  data:LearnResult;
  Message:string;
}
export interface LearnResult{
  id: number;
  className: string;
  studenId: number;
  avgscore: number;
  classId: number;
  firstName: string;
  lastName: string;
  doB: Date;
}
export interface LearnRespone{
  errorCode:number;
  data:Learn;
  Message:string;
}
export interface Learn{
  id: number;
  classid: number;
  idstudent: number;
  avgscore: number;
}
@Injectable({
  providedIn: 'root'
})
export class LearnresultService {

  constructor(private http:HttpClient, private api:ApiService) { }

  getall(couseiId : number, classId: number):Observable<LearnResultsRespone>{
    
    return this.http.get<LearnResultsRespone>(this.api.apiUrl.learnresult + "?ClassId=" + classId + "&CourseId=" + couseiId);
  }
  get(id):Observable<LearnRespone>{
    return this.http.get<LearnRespone>(this.api.apiUrl.learnresult + '/' + id);
  }
  update(data : Learn):Observable<LearnRespone>{
    const url = this.api.apiUrl.learnresult + '/' + data.id;
    return this.http.put<LearnRespone>(url,data);
  }
}
