import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.service';
import { ApiService } from './api.service';

export interface LecturersFullResponse {
  errorCode: number;
  data: LecturerFull[];
  message: string;
}

export interface LecturersResponse {
  errorCode: number;
  data: Lecturer[];
  message: string;
}
export interface LecturerResponse {
  errorCode: number;
  data: Lecturer;
  message: string;
}

export interface LecturerFull {
  userid: number;
  usE_USERID: number;
  lecturerid: number;
  academicrank: number;
  startdate: Date;
  lecturer: object;
  academic: object;
  user: User;
}

export interface Lecturer {
  userid: number;
  usE_USERID: number;
  lecturerid: number;
  academicrank: number;
  startday: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getLecturers(): Observable<LecturersFullResponse> {
    return this.http.get<LecturersFullResponse>(this.apiService.apiUrl.lecturer);
  }

  getLecturer(id): Observable<LecturerResponse> {
    const url = `${this.apiService.apiUrl.lecturer}/${id}`;
    return this.http.get<LecturerResponse>(url);
  }

  addLecturer(lecturer: Lecturer): Observable<LecturerResponse> {
    console.log(lecturer);
    return this.http.post<LecturerResponse>(this.apiService.apiUrl.lecturer, lecturer);
  }

  updateLecturer(lecturer: Lecturer): Observable<LecturerResponse> {
    const url = `${this.apiService.apiUrl.lecturer}/${lecturer.userid}`;
    return this.http.put<LecturerResponse>(url, lecturer);
  }

  deleteLecturer(id): Observable<LecturerResponse> {
    const url = `${this.apiService.apiUrl.lecturer}/${id}`;
    return this.http.delete<LecturerResponse>(url);
  }
}
