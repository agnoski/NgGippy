import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(loginData): void {
    console.log("login auth service: ", loginData);
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }

  logout(): void {
    console.log("logout auth service");
    localStorage.removeItem('loginData');
  }

  isLoggedIn(): boolean {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    console.log("isLoggedIn: ", loginData);
    return loginData && loginData.user && loginData.user === loginData.password;
  }
}
