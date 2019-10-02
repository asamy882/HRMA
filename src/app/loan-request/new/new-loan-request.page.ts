import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from '../loan-request.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoanRequest } from '../loan-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-new-loan-request',
  templateUrl: './new-loan-request.page.html',
  styleUrls: ['./new-loan-request.page.scss'],
})
export class NewLoanRequestPage implements OnInit {
  request: LoanRequest = new LoanRequest();
  requestForm: FormGroup;
  timePickerObj: any = {};
  datePickerObj: any = {};
  readonly = false;
  successMsg: string;
  errorMsg: string;
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/loan-request/search';
  title = 'app.loanRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: LoanRequestService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private router: Router
  ) {
    this.requestForm = formBuilder.group({
      LoanDate: new FormControl('', [Validators.required]),
      LoanValue: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', []),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.permissionRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.loanRequest.taskActionRequestPageTitle';
        this.service.getLoanRequest(requestId).subscribe(res => {
            if (res.Success) {
              this.request = res.Item;
              this.setFormValues(this.request);
              if (this.request.AllowedActions == AppConstants.INITIATE) {
                this.title = 'app.loanRequest.changeRequestPageTitle';
                this.renderSaveButton = true;
                this.readonly = false;
              } else {
                this.renderTaskActions = true;
              }
            }
          });
      } else {
        this.renderSaveButton = true;
      }
    });
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.loanRequest.successMsg', 'app.loanRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.loanRequest.successMsg'];
      this.errorMsg = res['app.loanRequest.errorMsg'];
    });

    this.datePickerObj = {
       inputDate: new Date(), // default new Date()
     // fromDate: new Date(), // default null
      //toDate: null, // default null
      showTodayButton: true, // default true
      closeOnSelect: true, // default false
    //  disableWeekDays: [4], // default []
      mondayFirst: false, // default false
      setLabel: 'Set',  // default 'Set'
      todayLabel: 'Today', // default 'Today'
      closeLabel: 'Close', // default 'Close'
      disabledDates: [], // default []
     // titleLabel: 'Select a Date', // default null
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY 
      clearButton : false,//!this.readonly , // default true
      momentLocale: 'pt-BR', // Default 'en-US'
      yearInAscending: false, // Default false
      btnCloseSetInReverse: true, // Default false
      btnProperties: {
        expand: 'block', // Default 'block'
        fill: 'solid', // Default 'solid'
        size: 'default', // Default 'default'
        disabled: false, // Default false
        strong: false, // Default false
        color: '' // Default ''
      },
      arrowNextPrev: {
      //  nextArrowSrc: 'assets/imgs/next.png',
       // prevArrowSrc: 'assets/imgs/previous.png'
      } // This object supports only SVG files.
    };
  }

  setFormValues(req: LoanRequest) {
    this.requestForm.controls['LoanDate'].setValue(req.LoanDate);
    this.requestForm.controls['LoanValue'].setValue(req.LoanValue);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
  }

  formatDate(date) {
    const d = new Date(date),
      year = d.getFullYear();
    let  month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  submit() {
    const request = {... this.requestForm.value,
        LoanDate : this.formatDate(this.requestForm.get('LoanDate').value),
        };
    this.service.addLoanRequest(request).subscribe(res => {
      if (res.Success) {
        this.displayMsg(this.successMsg, 'success');
        this.navigateToSearch(true);
      } else {
        this.displayMsg( res.Message, 'error');
      }
    });
  }

  navigateToSearch(reload) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      queryParams: null
    };
    this.router.navigate([this.backPage], navigationExtras).then(() => {
      if (reload) {
        window.location.reload();
      }
    });
  }

  async displayMsg(msg, cal) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: cal,
      duration: 5000
    });
    toast.present();
  }

  renderApproveAndRejectButtons() {
    return this.renderTaskActions && (this.request.AllowedActions == AppConstants.APPROVE_REJECT ||
      this.request.AllowedActions == AppConstants.APPROVE_REJECT_CHANGE_REQUEST);
  }

  renderOkButton() {
    return this.renderTaskActions && this.request.AllowedActions == AppConstants.REVIEW;
  }
}
