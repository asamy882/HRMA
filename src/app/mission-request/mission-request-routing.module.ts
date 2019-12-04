import { NewMissionRequestPage } from './new/new-mission-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMissionRequestsPage } from './search/search-mission-requests.page';
import { QTNewMissionRequestPage } from './qt-new/qt-new-mission-request.page';

const routes: Routes = [
  { path: 'new', component: NewMissionRequestPage },
  { path: 'qt-new', component: QTNewMissionRequestPage },
  { path: 'search', component: SearchMissionRequestsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRequestRoutingModule { }
