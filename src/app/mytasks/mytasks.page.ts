import { Component, OnInit } from '@angular/core';
import { MyTasksService } from './mytasks.service';
import { Router, NavigationExtras } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { LanguageService } from 'src/common/services/language.service';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.page.html',
  styleUrls: ['./mytasks.page.scss'],
})
export class MytasksPage implements OnInit {

  myTasks: any[] = [];

  constructor(private service: MyTasksService, private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.myTasks = [];
    this.service.getMyTasks().then(res => {
      this.myTasks = this.myTasks.concat(res.Items);
    });
  }

  goToDetails(task) {
    const navigationExtras: NavigationExtras = {
      queryParams: {requestId: task.RequestId},
      preserveFragment: true
    };
    let url;
    if ( task.RequestTypeId == AppConstants.VACATION_REQUEST) {
      url = '/vacation-request/new';
    } else if ( task.RequestTypeId == AppConstants.MISSION_REQUEST) {
      url = '/mission-request/new';
    } else if ( task.RequestTypeId == AppConstants.PENALTY_REQUEST) {
      url = '/penalty-request/new';
    } else if ( task.RequestTypeId == AppConstants.LOAN_REQUEST) {
      url = '/loan-request/new';
    } else if ( task.RequestTypeId == AppConstants.CHANGE_SHIFT_REQUEST) {
      url = '/change-shift-request/new';
    } else if ( task.RequestTypeId == AppConstants.CHANGE_DAYOFF_REQUEST) {
      url = '/change-day-off-request/new';
    } else if ( task.RequestTypeId == AppConstants.SHIFT_PLAN_REQUEST) {
      url = '/shift-plan-request/new';
    } else if ( task.RequestTypeId == AppConstants.WORK_IN_DAYOFF_REQUEST) {
      url = '/work-in-day-off-request/new';
    } else if ( task.RequestTypeId == AppConstants.OVERTIME_REQUEST) {
      url = '/overtime-request/new';
    } else if ( task.RequestTypeId == AppConstants.WORK_IN_WEEKLY_RESET_REQUEST) {
      url = '/work-in-weekly-reset-request/new';
    } else if ( task.RequestTypeId == AppConstants.CHANGE_WEEKLY_RESET_REQUEST) {
      url = '/change-weekly-reset-request/new';
    } else if ( task.RequestTypeId == AppConstants.ABSENCE_WITH_PERMISSION_REQUEST) {
      url = '/absence-with-permission-request/new';
    } else if ( task.RequestTypeId == AppConstants.PERMISSION_REQUEST) {
      url = '/permission-request/new';
    }
    // Redirect the user
    this.router.navigate([url], navigationExtras);
  }

}
