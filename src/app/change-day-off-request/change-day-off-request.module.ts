import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewChangeDayOffRequestPage } from './new/new-change-day-off-request.page';
import { ChangeDayOffRequestService } from './change-day-off-request.service';
import { ChangeDayOffRequestRoutingModule } from './change-day-off-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchChangeDayOffRequestsPage } from './search/search-change-day-off-requests.page';
import { ComponentsModule } from '../components/components.module';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    ChangeDayOffRequestRoutingModule,
    ComponentsModule,
    Ionic4DatepickerModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewChangeDayOffRequestPage, SearchChangeDayOffRequestsPage],
  declarations: [NewChangeDayOffRequestPage, SearchChangeDayOffRequestsPage],
  providers: [ChangeDayOffRequestService]
})
export class ChangeDayOffRequestModule {}