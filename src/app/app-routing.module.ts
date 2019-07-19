import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/common/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivateChild: [AuthGuard],
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    canActivateChild: [AuthGuard],
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'vacation-request',
    loadChildren: './vacation-request/vacation-request.module#VacationRequestModule'
  },
  {
    path: 'overtime-request',
    loadChildren: './overtime-request/overtime-request.module#OvertimeRequestModule'
  },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'mytasks', loadChildren: './mytasks/mytasks.module#MytasksPageModule' },
  { path: 'requests', loadChildren: './requests/requests.module#RequestsPageModule' },
  { path: 'myinformations', loadChildren: './myinformations/myinformations.module#MyinformationsPageModule' },  { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'mysalary', loadChildren: './mysalary/mysalary.module#MysalaryPageModule' },
  { path: 'myattendance', loadChildren: './myattendance/myattendance.module#MyattendancePageModule' },
  { path: 'top10request', loadChildren: './top10request/top10request.module#Top10requestPageModule' },
  { path: 'taskdetails', loadChildren: './taskdetails/taskdetails.module#TaskdetailsPageModule' },
  { path: 'choose-request-type', loadChildren: './choose-request-type/choose-request-type.module#ChooseRequestTypePageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
