import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface DegreesResponse {
  errorCode: number;
  data: Degree[];
  message: string;
}
export interface DegreeResponse {
  errorCode: number;
  data: Degree;
  message: string;
}

export interface Degree {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  endpoint = 'https://localhost:44324/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getDegrees(): Observable<DegreesResponse> {
    return this.http.get<DegreesResponse>(this.apiService.apiUrl.degree);
  }

  getDegree(id): Observable<DegreeResponse> {
    const url = `${this.apiService.apiUrl.degree}/${id}`;
    return this.http.get<DegreeResponse>(url);
  }

  addDegree(degree: Degree): Observable<DegreeResponse> {
    console.log(degree);
    return this.http.post<DegreeResponse>(this.apiService.apiUrl.degree, degree);
  }

  updateDegree(degree: Degree): Observable<DegreeResponse> {
    const url = `${this.apiService.apiUrl.degree}/${degree.id}`;
    return this.http.put<DegreeResponse>(url, degree);
  }

  deleteDegree(id): Observable<DegreeResponse> {
    const url = `${this.apiService.apiUrl.degree}/${id}`;
    return this.http.delete<DegreeResponse>(url);
  }
}
