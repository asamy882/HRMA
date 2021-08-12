import { Component, OnInit } from '@angular/core';
import { OvertimeRequestService } from '../overtime-request.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OvertimeRequest } from '../overtime-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-new-overtime-request',
  templateUrl: './new-overtime-request.page.html',
  styleUrls: ['./new-overtime-request.page.scss'],
})
export class NewOvertimeRequestPage implements OnInit {
  request: OvertimeRequest = new OvertimeRequest();
  requestForm: FormGroup;
  timePickerObj: any = {};
  datePickerObj: any = {};
  readonly = false;
  successMsg: string;
  errorMsg: string;
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/overtime-request/search';
  title = 'app.overtimeRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: OvertimeRequestService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private router: Router
  ) {
    this.requestForm = formBuilder.group({
      OvertimeDate: new FormControl('', [Validators.required]),
      FromTime: new FormControl('', [Validators.required]),
      ToTime: new FormControl('', [Validators.required]),
      ExtendNextDay: new FormControl('', []),
      Remarks: new FormControl('', []),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      if (req) {
        this.title = 'app.overtimeRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.readonly = true;
      }
    });
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.overtimeRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.overtimeRequest.taskActionRequestPageTitle';
        this.service.getOvertimeRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.overtimeRequest.changeRequestPageTitle';
            this.renderSaveButton = true;
            this.readonly = false;
          } else {
            this.renderTaskActions = true;
          }
          });
      } else {
        this.renderSaveButton = true;
      }
    });
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.overtimeRequest.successMsg', 'app.overtimeRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.overtimeRequest.successMsg'];
      this.errorMsg = res['app.overtimeRequest.errorMsg'];
    });
    // EXAMPLE OBJECT
    this.timePickerObj = {
      // inputTime: new Date().setHours(24, 0, 0), // default currentTime
      // inputTime: '11:01 PM', // for 12 hour time in timePicker
      // inputTime: '23:01', // for 24 hour time in timePicker

      // momentLocale: 'pt-BR', // default 'en-US'
      // timeFormat: 'kk:mm:ss', // default 'hh:mm A'
      // step: '3', // default 5
      // setLabel: 'S', // default 'Set'
      // closeLabel: 'C', // default 'Close'
      titleLabel: 'Select a Time', // default 'Time'
      // clearButton: false, // default true
      // btnCloseSetInReverse: true, // default false

      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      }
    };
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

  setFormValues(req: OvertimeRequest) {
    this.requestForm.controls['OvertimeDate'].setValue(req.OvertimeDate);
    this.requestForm.controls['FromTime'].setValue(req.FromTime);
    this.requestForm.controls['ToTime'].setValue(req.ToTime);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
    this.requestForm.controls['ExtendNextDay'].setValue(req.ExtendNextDay);
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
    this.renderSaveButton = false;
    const extendNextDay = this.requestForm.get('ExtendNextDay').value;
    const request = {... this.requestForm.value,
        OvertimeDate : this.formatDate(this.requestForm.get('OvertimeDate').value),
        ExtendNextDay: extendNextDay ? extendNextDay : false };
    this.service.addOvertimeRequest(request).then(res => {
      this.navigateToSearch(true);
    },
    error => {
      this.renderSaveButton = true;
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

  renderApproveAndRejectButtons() {
    return this.renderTaskActions && (this.request.AllowedActions == AppConstants.APPROVE_REJECT ||
      this.request.AllowedActions == AppConstants.APPROVE_REJECT_CHANGE_REQUEST);
  }

  renderOkButton() {
    return this.renderTaskActions && this.request.AllowedActions == AppConstants.REVIEW;
  }
}
