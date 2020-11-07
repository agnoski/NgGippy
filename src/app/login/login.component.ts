import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
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
