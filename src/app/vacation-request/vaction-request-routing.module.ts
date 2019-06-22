import { NewVacationRequestPage } from './new/new-vacation-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchVacationRequestsPage } from './search/search-vacation-requests.page';

const routes: Routes = [
  { path: 'new', component: NewVacationRequestPage },
  { path: 'search', component: SearchVacationRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VactionRequestRoutingModule { }
