import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponents } from './header/header.component';
import { TaskActionsComponent } from './task-actions/task-actions.component';
import { TranslateModule } from '@ngx-translate/core';
import { TaskActionsService } from './task-actions/task-actions.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule
  ],
  declarations: [HeaderComponents, TaskActionsComponent],
  exports: [HeaderComponents, TaskActionsComponent],
  providers: [TaskActionsService]
})
export class ComponentsModule {}
