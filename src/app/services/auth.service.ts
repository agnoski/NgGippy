import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: BehaviorSubject<any>;

  constructor() {
    this.userInfo = new BehaviorSubject(this.getUserInfo());
  }

  login(loginData): void {
    console.log("login auth service: ", loginData);
    localStorage.setItem('loginData', JSON.stringify(loginData));
    const subjectData = this.getUserInfo();
    this.userInfo.next(subjectData);
  }

  logout(): void {
    console.log("logout auth service");
    localStorage.removeItem('loginData');
    const subjectData = this.getUserInfo();
    this.userInfo.next(subjectData);
  }

  isLoggedIn(): boolean {
    const loginData = this.getLoginData();
    console.log("isLoggedIn: ", loginData);
    return loginData != null && loginData.user && loginData.user === loginData.password;
  }

  getLoginData(): any {
    return JSON.parse(localStorage.getItem('loginData'));
  }

  getUserInfo(): any {
    return {
      isLoggedIn: this.isLoggedIn(),
      loginData: this.getLoginData()
    };
  }

}
