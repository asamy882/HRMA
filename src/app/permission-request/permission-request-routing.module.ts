import { NewPermissionRequestPage } from './new/new-permission-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPermissionRequestsPage } from './search/search-permission-requests.page';

const routes: Routes = [
  { path: 'new', component: NewPermissionRequestPage },
  { path: 'search', component: SearchPermissionRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRequestRoutingModule { }
