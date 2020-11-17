import { LoginComponent } from './login/login.component';
import { BillsHomeComponent } from './components/bills-home/bills-home.component';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { BillsListComponent } from './components/bills-list/bills-list.component';
import { BillsSummaryComponent } from './components/bills-summary/bills-summary.component';
import { AuthGuard } from './guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: BillsHomeComponent, canActivate: [AuthGuard] },
	{ path: 'bills', component: BillsListComponent, canActivate: [AuthGuard]},
	{ path: 'form', component: BillFormComponent, canActivate: [AuthGuard] },
	{ path: 'summary', component: BillsSummaryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
