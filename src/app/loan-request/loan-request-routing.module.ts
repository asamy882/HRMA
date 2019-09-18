import { NewLoanRequestPage } from './new/new-loan-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchLoanRequestsPage } from './search/search-loan-requests.page';

const routes: Routes = [
  { path: 'new', component: NewLoanRequestPage },
  { path: 'search', component: SearchLoanRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRequestRoutingModule { }
