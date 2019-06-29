import { NewOvertimeRequestPage } from './new/new-overtime-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchOvertimeRequestsPage } from './search/search-overtime-requests.page';

const routes: Routes = [
  { path: 'new', component: NewOvertimeRequestPage },
  { path: 'search', component: SearchOvertimeRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OvertimeRequestRoutingModule { }
