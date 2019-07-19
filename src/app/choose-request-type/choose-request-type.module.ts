import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChooseRequestTypePage } from './choose-request-type.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseRequestTypePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChooseRequestTypePage]
})
export class ChooseRequestTypePageModule {}
