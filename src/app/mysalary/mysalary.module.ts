import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MysalaryPage } from './mysalary.page';

import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../components/components.module';
import { MySalaryService } from './mysalary.service';

const routes: Routes = [
  {
    path: '',
    component: MysalaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [MysalaryPage],
  declarations: [MysalaryPage],
  providers: [MySalaryService]
})
export class MysalaryPageModule {}
