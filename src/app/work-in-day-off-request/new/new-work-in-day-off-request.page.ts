import { Component, OnInit } from '@angular/core';
import { WorkinDayOffRequestService } from '../work-in-day-off-request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WorkinDayOffRequest } from '../work-in-day-off-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-new-work-in-day-off-request',
  templateUrl: './new-work-in-day-off-request.page.html',
  styleUrls: ['./new-work-in-day-off-request.page.scss'],
})
export class NewWorkinDayOffRequestPage implements OnInit {
  request: WorkinDayOffRequest = new WorkinDayOffRequest();
  requestForm: FormGroup;
  timePickerObj: any = {};
  datePickerObj: any = {};
  readonly = false;
  successMsg: string;
  errorMsg: string;
  employeeDayOffs: any[];
  employeeShifts: any[];
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/work-in-day-off-request/search';
  title = 'app.workinDayOffRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: WorkinDayOffRequestService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private router: Router,
    public appCon: AppConstants
  ) {
    this.requestForm = formBuilder.group({
      EmployeeShiftDate: new FormControl('', [Validators.required]),
      Shift: new FormControl('', [Validators.required]),
      SignIn: new FormControl('', [Validators.required]),
      SignOut: new FormControl('', [Validators.required]),
      ExtendNextDay: new FormControl('', []),
      Remarks: new FormControl('', []),
    });
  }

  shiftChanged(shiftId) {
    const shift =  this.employeeShifts.filter(s => s.ShiftId == shiftId)[0];
    this.requestForm.controls['SignIn'].setValue(shift.SignInTime);
    this.requestForm.controls['SignOut'].setValue(shift.SignOffTime);
    this.request.ExtendNextDay =  shift.SignOffNextDay;

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.workinDayOffRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.workinDayOffRequest.taskActionRequestPageTitle';
        this.service.getWorkinDayOffRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.workinDayOffRequest.changeRequestPageTitle';
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
   // this.loadEmployeeDayOffs();
    this.loadEmployeeShifts();
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.workinDayOffRequest.successMsg', 'app.workinDayOffRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.workinDayOffRequest.successMsg'];
      this.errorMsg = res['app.workinDayOffRequest.errorMsg'];
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

  }

  async loadEmployeeDayOffs() {
    this.service.getEmployeeDayOffs().then((res) => {
      this.employeeDayOffs = res.Items;
    });
  }

  async loadEmployeeShifts() {
    this.service.getEmployeeShifts().then((res) => {
      this.employeeShifts = res.Items;
    });
  }

  setFormValues(req: WorkinDayOffRequest) {
    this.requestForm.controls['EmployeeShiftDate'].setValue(req.EmployeeShiftDate);
    this.requestForm.controls['SignIn'].setValue(req.SignIn);
    this.requestForm.controls['SignOut'].setValue(req.SignOut);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
    this.requestForm.controls['Shift'].setValue(req.Shift.ShiftId);
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
    const request = {... this.requestForm.value,
        EmployeeShiftDate : this.formatDate(this.requestForm.get('EmployeeShiftDate').value),
        Shift: {ShiftId: this.requestForm.get('Shift').value}
       };
    this.service.addWorkinDayOffRequest(request).then(res => {
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
