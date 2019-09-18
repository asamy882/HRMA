import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewChangeShiftRequestPage } from './new/new-change-shift-request.page';
import { ChangeShiftRequestService } from './change-shift-request.service';
import { ChangeShiftRequestRoutingModule } from './change-shift-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchChangeShiftRequestsPage } from './search/search-change-shift-requests.page';
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
    ChangeShiftRequestRoutingModule,
    ComponentsModule,
    Ionic4DatepickerModule,
    ReactiveFormsModule
  ],
  declarations: [NewChangeShiftRequestPage, SearchChangeShiftRequestsPage],
  providers: [ChangeShiftRequestService]
})
export class ChangeShiftRequestModule {}