import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ClassroomRespone{
  errorCode:number;
  data:Classroom;
  message:string;
}
export interface ClassroomsRespone{
  errorCode:number;
  data:Classroom [];
  message:string;
}
export interface Classroom{
  id:number;
  name:string;
  dateadded:Date;
  capacity:number;
  addedperson:number;
  person: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http:HttpClient, private api:ApiService) { }

  getall():Observable<ClassroomsRespone>{
    
    return this.http.get<ClassroomsRespone>(this.api.apiUrl.classroom);
  }

  get(id):Observable<ClassroomRespone>{
    return this.http.get<ClassroomRespone>(this.api.apiUrl.classroom + '/' + id);
  }
  
  delete(id):Observable<ClassroomRespone>{
    const url = this.api.apiUrl.classroom + '/' + id;
    return this.http.delete<ClassroomRespone>(url);
  }

  update(data : Classroom):Observable<ClassroomRespone>{
    const url = this.api.apiUrl.classroom + '/' + data.id;
    return this.http.put<ClassroomRespone>(url,data);
  }

  add(data: Classroom):Observable<ClassroomRespone>{
    return this.http.post<ClassroomRespone>(this.api.apiUrl.classroom,data);
  }

}
