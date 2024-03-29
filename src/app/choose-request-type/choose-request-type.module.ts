import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChooseRequestTypePage } from './choose-request-type.page';

import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

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
    ComponentsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ChooseRequestTypePage],
  declarations: [ChooseRequestTypePage]
})
export class ChooseRequestTypePageModule {}
