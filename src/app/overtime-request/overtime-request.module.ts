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



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    IonicTimepickerModule,
    OvertimeRequestRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewOvertimeRequestPage, SearchOvertimeRequestsPage],
  providers: [OvertimeRequestService]
})
export class OvertimeRequestModule {}