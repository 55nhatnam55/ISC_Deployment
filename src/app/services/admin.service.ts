import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ListAdminResponse {
  data: Admin[];
  errorCode: number;
  message: string;
}
export interface AdminResponse {
  data: Admin;
  errorCode: number;
  message: string;
}
export interface Admin {
  adminid: number;
  username: string;
  password: string;
  fullname: string;
  imageName: string;
  image: File;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // nhận thông tin từ server và trả về
  constructor(private api: ApiService, private http: HttpClient) { }
  get(id): Observable<AdminResponse> {
    return this.http.get<AdminResponse>(this.api.apiUrl.admins + '/' + id);
  }
  getAll(): Observable<ListAdminResponse> {
    return this.http.get<ListAdminResponse>(this.api.apiUrl.admins);
  }
  add(data: FormData): Observable<AdminResponse> {
    console.log(data);
    return this.http.post<AdminResponse>(this.api.apiUrl.admins, data);
  }
  update(data: Admin): Observable<AdminResponse> {
    const url = `${this.api.apiUrl.admins}/${data.adminid}`;
    return this.http.put<AdminResponse>(url, data);
  }
  delete(id): Observable<AdminResponse> {
    const url = `${this.api.apiUrl.admins}/${id}`;
    return this.http.delete<AdminResponse>(url);
  }
}
