import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MissionSignInOutPage } from './mission-sign-in-out.page';

import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '../components/components.module';
import { MissionSignInOutService } from './mission-sign-in-out.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';



const routes: Routes = [
  {
    path: '',
    component: MissionSignInOutPage
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
  entryComponents: [MissionSignInOutPage],
  declarations: [MissionSignInOutPage],
  providers: [MissionSignInOutService, Geolocation, UniqueDeviceID]
})
export class MissionSignInOutModule {}
