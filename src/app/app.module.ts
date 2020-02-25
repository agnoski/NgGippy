import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { BillDetailsComponent } from './bills/bill-details/bill-details.component';
import { BillsListComponent } from './bills/bills-list/bills-list.component';
import { BillFormComponent } from './bills/bill-form/bill-form.component';
import { BillsSummaryComponent } from './bills/bills-summary/bills-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BillDetailsComponent,
    BillsListComponent,
    BillFormComponent,
    BillsSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
