import { NewChangeDayOffRequestPage } from './new/new-change-day-off-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchChangeDayOffRequestsPage } from './search/search-change-day-off-requests.page';

const routes: Routes = [
  { path: 'new', component: NewChangeDayOffRequestPage },
  { path: 'search', component: SearchChangeDayOffRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDayOffRequestRoutingModule { }
