import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyShiftSchedulePage } from './myshift-schedule.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { MyShiftScheduleService } from './myshift-schedule.service';

const routes: Routes = [
  {
    path: '',
    component: MyShiftSchedulePage
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
  entryComponents: [MyShiftSchedulePage],
  declarations: [MyShiftSchedulePage],
  providers: [MyShiftScheduleService]
})
export class MyShiftSchedulePageModule {}
