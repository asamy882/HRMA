import { Component, OnInit, Input } from '@angular/core';
import { TaskActionsService } from './task-actions.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss'],
})
export class TaskActionsComponent implements OnInit {

  @Input() workflowInstanceId: string;
  @Input() renderApproveButton: boolean;
  @Input() renderOkButton: boolean;
  @Input() renderRejectButton: boolean;
  @Input() renderChangeButton: boolean;
  @Input() renderComments: boolean;
  @Input() commentsRequired: boolean;

  comments: string;
  approveSuccessMsg: string;
  rejectSuccessMsg: string;
  changeSuccessMsg: string;
  reviewSuccessMsg: string;
  errorMsg: string;

  constructor(private readonly translate: TranslateService, private service: TaskActionsService,
              private languageService: LanguageService, private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.taskAction.approveSuccessMsg', 'app.taskAction.rejectSuccessMsg', 'app.taskAction.changeSuccessMsg',
                        'app.taskAction.errorMsg', 'app.taskAction.reviewSuccessMsg']).subscribe(res => {
      this.approveSuccessMsg = res['app.taskAction.approveSuccessMsg'];
      this.rejectSuccessMsg = res['app.taskAction.rejectSuccessMsg'];
      this.changeSuccessMsg = res['app.taskAction.changeSuccessMsg'];
      this.reviewSuccessMsg = res['app.taskAction.reviewSuccessMsg'];
      this.errorMsg = res['app.taskAction.errorMsg'];
    });
  }

  ok() {
    this.doTaskAction(AppConstants.REVIEWED, this.reviewSuccessMsg);
  }

  approve() {
    this.doTaskAction(AppConstants.APPROVE, this.approveSuccessMsg);
  }

  reject() {
    this.doTaskAction(AppConstants.REJECT, this.rejectSuccessMsg);
  }

  changeRequest() {
    this.doTaskAction(AppConstants.CHANGE_REQUEST, this.changeSuccessMsg);
  }

  doTaskAction(decision, successMsg) {
    const action = {
      WorkflowInstanceId: this.workflowInstanceId,
      Comments: this.comments,
      Decision: decision
    };

    this.service.doTaskAction(action).then(res => {
      this.navigateToSearch(true);
    });
  }

  navigateToSearch(reload) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      queryParams: null
    };
    this.router.navigate(['/mytasks'], navigationExtras).then(() => {
      if (reload) {
        window.location.reload();
      }
    });
  }

}
