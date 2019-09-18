import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewLoanRequestPage } from './new/new-loan-request.page';
import { LoanRequestService } from './loan-request.service';
import { LoanRequestRoutingModule } from './loan-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchLoanRequestsPage } from './search/search-loan-requests.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    IonicSelectableModule,
    LoanRequestRoutingModule,
    Ionic4DatepickerModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NewLoanRequestPage, SearchLoanRequestsPage],
  providers: [LoanRequestService]
})
export class LoanRequestModule {}