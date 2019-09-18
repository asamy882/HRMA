import { NewWorkinDayOffRequestPage } from './new/new-work-in-day-off-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchWorkinDayOffRequestsPage } from './search/search-work-in-day-off-requests.page';

const routes: Routes = [
  { path: 'new', component: NewWorkinDayOffRequestPage },
  { path: 'search', component: SearchWorkinDayOffRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkinDayOffRequestRoutingModule { }
