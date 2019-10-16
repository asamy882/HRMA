import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewPermissionRequestPage } from './new/new-permission-request.page';
import { PermissionRequestService } from './permission-request.service';
import { PermissionRequestRoutingModule } from './permission-request-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SearchPermissionRequestsPage } from './search/search-permission-requests.page';
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
    PermissionRequestRoutingModule,
    Ionic4DatepickerModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewPermissionRequestPage, SearchPermissionRequestsPage],
  declarations: [NewPermissionRequestPage, SearchPermissionRequestsPage],
  providers: [PermissionRequestService]
})
export class PermissionRequestModule {}