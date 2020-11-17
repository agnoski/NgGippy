import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { BillDetailsComponent } from './components/bill-details/bill-details.component';
import { BillsListComponent } from './components/bills-list/bills-list.component';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { BillsSummaryComponent } from './components/bills-summary/bills-summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { BillsHomeComponent } from './components/bills-home/bills-home.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { BillsNavbarComponent } from './components/bills-navbar/bills-navbar.component';
import { BillsLoadingComponent } from './components/bills-loading/bills-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    BillDetailsComponent,
    BillsListComponent,
    BillFormComponent,
    BillsSummaryComponent,
    LoginComponent,
    BillsHomeComponent,
    ReversePipe,
    BillsNavbarComponent,
    BillsLoadingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AppRoutingModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
