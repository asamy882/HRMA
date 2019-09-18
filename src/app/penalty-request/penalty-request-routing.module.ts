import { NewPenaltyRequestPage } from './new/new-penalty-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPenaltyRequestsPage } from './search/search-penalty-requests.page';

const routes: Routes = [
  { path: 'new', component: NewPenaltyRequestPage },
  { path: 'search', component: SearchPenaltyRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenaltyRequestRoutingModule { }
