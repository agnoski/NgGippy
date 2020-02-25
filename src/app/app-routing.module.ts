import { BillFormComponent } from './bills/bill-form/bill-form.component';
import { BillsListComponent } from './bills/bills-list/bills-list.component';
import { BillsSummaryComponent } from './bills/bills-summary/bills-summary.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'bills', component: BillsListComponent },
	{ path: 'form', component: BillFormComponent },
	{ path: 'summary', component: BillsSummaryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
