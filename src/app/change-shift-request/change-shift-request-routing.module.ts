import { NewChangeShiftRequestPage } from './new/new-change-shift-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchChangeShiftRequestsPage } from './search/search-change-shift-requests.page';

const routes: Routes = [
  { path: 'new', component: NewChangeShiftRequestPage },
  { path: 'search', component: SearchChangeShiftRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeShiftRequestRoutingModule { }
