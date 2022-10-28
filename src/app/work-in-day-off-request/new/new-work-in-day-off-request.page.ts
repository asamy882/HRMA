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
    var signIn = new Date();
    var signInTime = shift.SignInTime.split(":");
    var signInHours = parseInt(signInTime[0]);
    if(signInTime[1].split(" ")[1] == "PM"){
      signInHours = signInHours + 12;
    }
    signIn.setHours(signInHours);
    signIn.setMinutes(signInTime[1].split(" ")[0]);

    var signOff = new Date();
    var signOffTime = shift.SignOffTime.split(":");
    var signOffHours = parseInt(signOffTime[0]);
    if(signOffTime[1].split(" ")[1] == "PM"){
      signOffHours = signOffHours + 12;
    }
    signOff.setHours(signOffHours);
    signOff.setMinutes(signOffTime[1].split(" ")[0]);

    this.requestForm.controls['SignIn'].setValue(signIn.toISOString());
    this.requestForm.controls['SignOut'].setValue(signOff.toISOString());
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
        this.renderCloseButton = false;
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

    var fromTime="";
    var fromHours = new Date(this.requestForm.controls['SignIn'].value).getHours();
    var fromMinutes = new Date(this.requestForm.controls['SignIn'].value).getMinutes();    
    if(fromHours > 12){
      fromHours = fromHours - 12;
      fromTime = (fromHours < 10 ? "0" : "") + fromHours + ":" + (fromMinutes > 10 ? fromMinutes : "0" + fromMinutes) + " PM";
    } else {
      fromTime = (fromHours < 10 ? "0" : "") + fromHours + ":" + (fromMinutes > 10 ? fromMinutes : "0" + fromMinutes) + " AM";
    }

    var toTime="";
    var toHours = new Date(this.requestForm.controls['SignOut'].value).getHours();
    var toMinutes = new Date(this.requestForm.controls['SignOut'].value).getMinutes();    
    if(toHours > 12){
      toHours = toHours - 12;
      toTime = (toHours < 10 ? "0" : "") + toHours + ":" + (toMinutes > 10 ? toMinutes : "0" + toMinutes) + " PM";
    } else {
      toTime = (toHours < 10 ? "0" : "") + toHours + ":" + (toMinutes > 10 ? toMinutes : "0" + toMinutes) + " AM";
    }

    const request = {... this.requestForm.value,
        SignIn: fromTime,
        SignOut: toTime,
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
