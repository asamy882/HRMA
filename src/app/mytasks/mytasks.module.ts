import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MytasksPage } from './mytasks.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { MyTasksService } from './mytasks.service';

const routes: Routes = [
  {
    path: '',
    component: MytasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [MytasksPage],
  declarations: [MytasksPage],
  providers: [MyTasksService]
})
export class MytasksPageModule {}
