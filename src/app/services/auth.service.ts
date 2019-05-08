import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // xac dinh trang thai dang nhap va
  // luu gia tri dang nhap vao localStorage
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn' || 'false'));

  constructor() { }
  setLoggIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }
  get isLoggedIn() {
    return this.loggedInStatus;
  }
}
