import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SpecializedTrainingService } from './specialized-training.service';

export class Course {
  courseId: number;
  name: string;
  startdate: Date;
  enddate: Date;
  note: string;
}

export class CourseResponse {
  errorCode: number;
  errorMessage: string;
  data: Course;
}

export class CoursesResponse {
  errorCode: number;
  errorMessage: string;
  data: Course[];
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  constructor(private http: HttpClient, private api: ApiService, private trainingService: SpecializedTrainingService) { }
  getAll(): Observable<CoursesResponse> {
    const url = this.api.apiUrl.course;
    return this.http.get<CoursesResponse>(url);
  }

  get(Id): Observable<CourseResponse> {
    const url = this.api.apiUrl.course + '/' + Id;
    return this.http.get<CourseResponse>(url);
  }

  add(data: Course): Observable<CourseResponse> {
    const url = this.api.apiUrl.course;
    return this.http.post<CourseResponse>(url, data);
  }

  update(data: Course, Id): Observable<CourseResponse> {
    const url = this.api.apiUrl.course + '/' + Id;
    return this.http.put<CourseResponse>(url, data);
  }

  delete(Id): Observable<CourseResponse> {
    const url = this.api.apiUrl.course + '/' + Id;
    return this.http.delete<CourseResponse>(url);
  }
}
