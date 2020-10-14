import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills-navbar',
  templateUrl: './bills-navbar.component.html',
  styleUrls: ['./bills-navbar.component.css']
})
export class BillsNavbarComponent implements OnInit {

  title = "Gippy";
  isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
