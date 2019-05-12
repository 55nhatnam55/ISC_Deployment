import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface statisticalsResponse{
  errorCode: number;
  data: statistical[];
  message: string;
}
export interface statispassResponse{
  errorCode: number;
  data: statispass[];
  message: string;
}

export interface statistical{
  idCourse : number;
  courseName : string;
  avg : number;
}
export interface statispass{
  courseName : number;
  pass : number;
  fail : number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisService {

  constructor(private http: HttpClient, private apiService: ApiService) { }
  getAll(): Observable<statisticalsResponse> {
    return this.http.get<statisticalsResponse>(this.apiService.apiUrl.statis);
  }
  getPass(id): Observable<statispassResponse> {
    return this.http.get<statispassResponse>(this.apiService.apiUrl.statis+'/'+id);
  }
}
