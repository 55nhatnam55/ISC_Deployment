import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface TrainingSubject {
  trainingSubjectId: number;
  subjectId: number;
  trainingId: number;
}

export interface TrainingSubjectResponse {
  errorCode: number;
  message: string;
  data: TrainingSubject;
}

export interface TrainingSubjectsResponse {
  errorCode: number;
  message: string;
  data: TrainingSubject[];
}
@Injectable({
  providedIn: 'root'
})
export class TrainingsubjectService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getAll(): Observable<TrainingSubjectsResponse> {
    const url = this.api.apiUrl.trainingsubject;
    return this.http.get<TrainingSubjectsResponse>(url);
  }

  get(TrainingId): Observable<TrainingSubjectResponse> {
    const url = this.api.apiUrl.trainingsubject + '/' + TrainingId;
    return this.http.get<TrainingSubjectResponse>(url);
  }

  getTrainingSubject(data: TrainingSubject): Observable<TrainingSubjectResponse> {
    const url = this.api.apiUrl.trainingsubject + '/gettrainingsubject';
    return this.http.post<TrainingSubjectResponse>(url, data);
  }

  add(data: TrainingSubject): Observable<TrainingSubjectResponse> {
    const url = this.api.apiUrl.trainingsubject;
    return this.http.post<TrainingSubjectResponse>(url, data);
  }

  delete(id): Observable<TrainingSubjectResponse> {
    const url = this.api.apiUrl.trainingsubject + '/DeleteTrainingSubject/' + id;
    return this.http.delete<TrainingSubjectResponse>(url);
  }

  deleteAllByTrainingId(TrainingId): Observable<TrainingSubjectResponse> {
    const url = this.api.apiUrl.trainingsubject + '/DeleteAllByTrainingId/' + TrainingId;
    return this.http.delete<TrainingSubjectResponse>(url);
  }
}
