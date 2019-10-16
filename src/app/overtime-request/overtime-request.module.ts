import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewOvertimeRequestPage } from './new/new-overtime-request.page';
import { OvertimeRequestService } from './overtime-request.service';
import { OvertimeRequestRoutingModule } from './overtime-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchOvertimeRequestsPage } from './search/search-overtime-requests.page';
import { IonicTimepickerModule } from '@logisticinfotech/ionic-timepicker';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    IonicTimepickerModule,
    OvertimeRequestRoutingModule,
    Ionic4DatepickerModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewOvertimeRequestPage, SearchOvertimeRequestsPage],
  declarations: [NewOvertimeRequestPage, SearchOvertimeRequestsPage],
  providers: [OvertimeRequestService]
})
export class OvertimeRequestModule {}