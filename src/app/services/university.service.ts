import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface UniversitysResponse {
  errorCode: number;
  data: University[];
  message: string;
}
export interface UniversityResponse {
  errorCode: number;
  data: University;
  message: string;
}

export interface University {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getUniversities(): Observable<UniversitysResponse> {
    return this.http.get<UniversitysResponse>(this.apiService.apiUrl.university);
  }

  getUniversity(id): Observable<UniversityResponse> {
    const url = `${this.apiService.apiUrl.university}/${id}`;
    return this.http.get<UniversityResponse>(url);
  }

  addUniversity(university: University): Observable<UniversityResponse> {
    return this.http.post<UniversityResponse>(this.apiService.apiUrl.university, university);
  }

  updateUniversity(university: University): Observable<UniversityResponse> {
    const url = `${this.apiService.apiUrl.university}/${university.id}`;
    return this.http.put<UniversityResponse>(url, university);
  }

  deleteUniversity(id): Observable<UniversityResponse> {
    const url = `${this.apiService.apiUrl.university}/${id}`;
    return this.http.delete<UniversityResponse>(url);
  }
}
