import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface AcademicsResponse {
  errorCode: number;
  data: Academic[];
  message: string;
}
export interface AcademicResponse {
  errorCode: number;
  data: Academic;
  message: string;
}

export interface Academic {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getAcademics(): Observable<AcademicsResponse> {
    return this.http.get<AcademicsResponse>(this.apiService.apiUrl.academic);
  }

  getAcademic(id): Observable<AcademicResponse> {
    const url = `${this.apiService.apiUrl.academic}/${id}`;
    return this.http.get<AcademicResponse>(url);
  }

  addAcademic(academic: Academic): Observable<AcademicResponse> {
    console.log(academic);
    return this.http.post<AcademicResponse>(this.apiService.apiUrl.academic, academic);
  }

  updateAcademic(academic: Academic): Observable<AcademicResponse> {
    const url = `${this.apiService.apiUrl.academic}/${academic.id}`;
    return this.http.put<AcademicResponse>(url, academic);
  }

  deleteAcademic(id): Observable<AcademicResponse> {
    const url = `${this.apiService.apiUrl.academic}/${id}`;
    return this.http.delete<AcademicResponse>(url);
  }
}
