import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface MajorsResponse {
  errorCode: number;
  data: Major[];
  message: string;
}
export interface MajorResponse {
  errorCode: number;
  data: Major;
  message: string;
}

export interface Major {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getMajors(): Observable<MajorsResponse> {
    return this.http.get<MajorsResponse>(this.apiService.apiUrl.major);
  }

  getMajor(id): Observable<MajorResponse> {
    const url = `${this.apiService.apiUrl.major}/${id}`;
    return this.http.get<MajorResponse>(url);
  }

  addMajor(major: Major): Observable<MajorResponse> {
    console.log(major);
    return this.http.post<MajorResponse>(this.apiService.apiUrl.major, major);
  }

  updateMajor(major: Major): Observable<MajorResponse> {
    const url = `${this.apiService.apiUrl.major}/${major.id}`;
    return this.http.put<MajorResponse>(url, major);
  }

  deleteMajor(id): Observable<MajorResponse> {
    const url = `${this.apiService.apiUrl.major}/${id}`;
    return this.http.delete<MajorResponse>(url);
  }
}
