import { Component } from '@angular/core';
import { AngularFireDatabase  } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-gippy';
  items : Observable<any[]>;
  constructor(db: AngularFireDatabase) {
  	this.items = db.list('gippy/bills').valueChanges();
  }
}