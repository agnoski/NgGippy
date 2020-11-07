import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(loginData): void {
    console.log("login component: ", loginData);
    this.authService.login(loginData);
    this.router.navigate(['/home']);
  }

  logout(): void {
    console.log("logout component");
    this.authService.logout();
  }

  onSubmit(formData): void {
    console.log(formData);
    this.login(formData);
  }

}
