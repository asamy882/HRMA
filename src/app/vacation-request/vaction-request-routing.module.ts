import { NewVacationRequestPage } from './new/new-vacation-request.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'new', component: NewVacationRequestPage }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VactionRequestRoutingModule { }
