import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewPenaltyRequestPage } from './new/new-penalty-request.page';
import { PenaltyRequestService } from './penalty-request.service';
import { PenaltyRequestRoutingModule } from './penalty-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchPenaltyRequestsPage } from './search/search-penalty-requests.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    Ionic4DatepickerModule,
    PenaltyRequestRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewPenaltyRequestPage, SearchPenaltyRequestsPage],
  declarations: [NewPenaltyRequestPage, SearchPenaltyRequestsPage],
  providers: [PenaltyRequestService]
})
export class PenaltyRequestModule {}