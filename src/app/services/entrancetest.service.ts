import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface EntranceTestsResponse {
  errorCode: number;
  data: EntranceTest[];
  Message: string;
}
export interface EntranceTestResponse {
  errorCode: number;
  data: EntranceTest;
  Message: string;
}
export interface EntranceTest {
  id: number;
  courseid: number;
  testdate: Date;
  courseName: string;
}
@Injectable({
  providedIn: 'root'
})
export class EntranceTestService {

  constructor(private http: HttpClient, private api: ApiService) { }
  getAll(): Observable<EntranceTestsResponse> {
    return this.http.get<EntranceTestsResponse>(this.api.apiUrl.entrancetest);
  }
  get(id): Observable<EntranceTestResponse> {
    return this.http.get<EntranceTestResponse>(this.api.apiUrl.entrancetest + '/' + id);
  }
  add(data: EntranceTest): Observable<EntranceTestResponse> {
    return this.http.post<EntranceTestResponse>(this.api.apiUrl.entrancetest, data);
  }
  update(data: EntranceTest): Observable<EntranceTestResponse> {
    const url = `${this.api.apiUrl.entrancetest}/${data.id}`;
    return this.http.put<EntranceTestResponse>(url, data);
  }
  delete(id): Observable<EntranceTestResponse> {
    const url = `${this.api.apiUrl.entrancetest}/${id}`;
    return this.http.delete<EntranceTestResponse>(url);
  }
}
