import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyattendancePage } from './myattendance.page';

import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../components/components.module';
import { MyAttendanceService } from './myattendance.service';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';


const routes: Routes = [
  {
    path: '',
    component: MyattendancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyattendancePage],
  providers: [MyAttendanceService]
})
export class MyattendancePageModule {}
