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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
