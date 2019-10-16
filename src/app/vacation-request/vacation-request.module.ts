import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewVacationRequestPage } from './new/new-vacation-request.page';
import { VacationRequestService } from './vacation-request.service';
import { VactionRequestRoutingModule } from './vaction-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchVacationRequestsPage } from './search/search-vacation-requests.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    VactionRequestRoutingModule,
    Ionic4DatepickerModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewVacationRequestPage, SearchVacationRequestsPage],
  declarations: [NewVacationRequestPage, SearchVacationRequestsPage],
  providers: [VacationRequestService]
})
export class VacationRequestModule {}