import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyVacationsBalancePage } from './myvacations-balance.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { MyVacationsBalanceService } from './myvacations-balance.service';

const routes: Routes = [
  {
    path: '',
    component: MyVacationsBalancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [MyVacationsBalancePage],
  declarations: [MyVacationsBalancePage],
  providers: [MyVacationsBalanceService]
})
export class MyVacationsBalancePageModule {}
