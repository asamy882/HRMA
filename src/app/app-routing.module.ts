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
    path: 'logout',
    canActivate: [AuthGuard],
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'vacation-request',
    canActivateChild: [AuthGuard],
    loadChildren: './vacation-request/vacation-request.module#VacationRequestModule'
  },
  {
    path: 'overtime-request',
    canActivateChild: [AuthGuard],
    loadChildren: './overtime-request/overtime-request.module#OvertimeRequestModule'
  },
  {
    path: 'loan-request',
    canActivateChild: [AuthGuard],
    loadChildren: './loan-request/loan-request.module#LoanRequestModule'
  },
  {
    path: 'work-in-day-off-request',
    canActivateChild: [AuthGuard],
    loadChildren: './work-in-day-off-request/work-in-day-off-request.module#WorkinDayOffRequestModule'
  },
  {
    path: 'change-day-off-request',
    canActivateChild: [AuthGuard],
    loadChildren: './change-day-off-request/change-day-off-request.module#ChangeDayOffRequestModule'
  },
  {
    path: 'change-shift-request',
    canActivateChild: [AuthGuard],
    loadChildren: './change-shift-request/change-shift-request.module#ChangeShiftRequestModule'
  },
  {
    path: 'penalty-request',
    canActivateChild: [AuthGuard],
    loadChildren: './penalty-request/penalty-request.module#PenaltyRequestModule'
  },
  {
    path: 'mission-request',
    canActivateChild: [AuthGuard],
    loadChildren: './mission-request/mission-request.module#MissionRequestModule'
  },
  {
    path: 'permission-request',
    canActivateChild: [AuthGuard],
    loadChildren: './permission-request/permission-request.module#PermissionRequestModule'
  },
  { path: 'about', canActivateChild: [AuthGuard], loadChildren: './about/about.module#AboutPageModule' },
  { path: 'mytasks', canActivateChild: [AuthGuard], loadChildren: './mytasks/mytasks.module#MytasksPageModule' },
  { path: 'requests', canActivateChild: [AuthGuard], loadChildren: './requests/requests.module#RequestsPageModule' },
  { path: 'myinformations', canActivateChild: [AuthGuard],
    loadChildren: './myinformations/myinformations.module#MyinformationsPageModule' },
  { path: 'myprofile', canActivateChild: [AuthGuard], loadChildren: './myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'mysalary', canActivateChild: [AuthGuard], loadChildren: './mysalary/mysalary.module#MysalaryPageModule' },
  { path: 'mysalary', canActivateChild: [AuthGuard], loadChildren: './mysalary/mysalary.module#MysalaryPageModule' },
  { path: 'myattendance', canActivateChild: [AuthGuard], loadChildren: './myattendance/myattendance.module#MyattendancePageModule' },
  { path: 'myshift-schedule', canActivateChild: [AuthGuard],
    loadChildren: './myshift-schedule/myshift-schedule.module#MyShiftSchedulePageModule' },
  { path: 'myvacations-balance', canActivateChild: [AuthGuard],
    loadChildren: './myvacations-balance/myvacations-balance.module#MyVacationsBalancePageModule' },
  { path: 'choose-request-type', canActivateChild: [AuthGuard],
    loadChildren: './choose-request-type/choose-request-type.module#ChooseRequestTypePageModule' } ,
  { path: 'sign-in-out', canActivateChild: [AuthGuard], //loadChildren: () => import('./sign-in-out/sign-in-out.module').then( m => m.SignInOutModule)
     loadChildren: './sign-in-out/sign-in-out.module#SignInOutModule' 
    } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
