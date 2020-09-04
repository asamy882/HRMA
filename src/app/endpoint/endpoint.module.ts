import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EndpointPage } from './endpoint.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { EndpointService } from './endpoint.service';



const routes: Routes = [
  {
    path: '',
    component: EndpointPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [EndpointPage],
  declarations: [EndpointPage],
  providers: [EndpointService]
})
export class EndpointPageModule {}
