import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-bills-navbar',
  templateUrl: './bills-navbar.component.html',
  styleUrls: ['./bills-navbar.component.css']
})
export class BillsNavbarComponent implements OnInit {

  title = "Gippy";
  isCollapsed = true;
  userInfo;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userInfo.subscribe(data => {
      console.log("Got data into navbar from login: ", data);
      this.userInfo = data;
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
