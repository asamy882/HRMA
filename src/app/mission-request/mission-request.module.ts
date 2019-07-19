import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewMissionRequestPage } from './new/new-mission-request.page';
import { MissionRequestService } from './mission-request.service';
import { MissionRequestRoutingModule } from './mission-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchMissionRequestsPage } from './search/search-mission-requests.page';
import { IonicTimepickerModule } from '@logisticinfotech/ionic-timepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    IonicTimepickerModule,
    MissionRequestRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewMissionRequestPage, SearchMissionRequestsPage],
  providers: [MissionRequestService]
})
export class MissionRequestModule {}