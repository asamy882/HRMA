import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewWorkinDayOffRequestPage } from './new/new-work-in-day-off-request.page';
import { WorkinDayOffRequestService } from './work-in-day-off-request.service';
import { WorkinDayOffRequestRoutingModule } from './work-in-day-off-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchWorkinDayOffRequestsPage } from './search/search-work-in-day-off-requests.page';
import { IonicTimepickerModule } from '@logisticinfotech/ionic-timepicker';
import { ComponentsModule } from '../components/components.module';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    IonicTimepickerModule,
    WorkinDayOffRequestRoutingModule,
    ComponentsModule,
    Ionic4DatepickerModule,
    ReactiveFormsModule
  ],
  declarations: [NewWorkinDayOffRequestPage, SearchWorkinDayOffRequestsPage],
  providers: [WorkinDayOffRequestService]
})
export class WorkinDayOffRequestModule {}