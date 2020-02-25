import { BillFormComponent } from './bills/bill-form/bill-form.component';
import { BillsListComponent } from './bills/bills-list/bills-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: '', redirectTo: 'bills', pathMatch: 'full' },
{ path: 'bills', component: BillsListComponent },
{ path: 'form', component: BillFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
