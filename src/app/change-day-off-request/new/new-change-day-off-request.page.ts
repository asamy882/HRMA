import { Component, OnInit } from '@angular/core';
import { ChangeDayOffRequestService } from '../change-day-off-request.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChangeDayOffRequest } from '../change-day-off-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-new-change-day-off-request',
  templateUrl: './new-change-day-off-request.page.html',
  styleUrls: ['./new-change-day-off-request.page.scss'],
})
export class NewChangeDayOffRequestPage implements OnInit {
  request: ChangeDayOffRequest = new ChangeDayOffRequest();
  requestForm: FormGroup;
  datePickerObj: any = {};
  readonly = false;
  successMsg: string;
  errorMsg: string;
  employeeDayOffs: any[];
  employeeShifts: any[];
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/change-day-off-request/search';
  title = 'app.changeDayOffRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: ChangeDayOffRequestService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private router: Router
  ) {
    this.requestForm = formBuilder.group({
      OldDayOffDate: new FormControl('', [Validators.required]),
      NewDayOffDate: new FormControl('', [Validators.required]),
      Shift: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', []),
    });
  }

  shiftChanged(shiftId) {
    this.request.Shift =  this.employeeShifts.filter(s => s.ShiftId == shiftId)[0];

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.changeDayOffRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.changeDayOffRequest.taskActionRequestPageTitle';
        this.service.getChangeDayOffRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.changeDayOffRequest.changeRequestPageTitle';
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
    this.translate.get(['app.changeDayOffRequest.successMsg', 'app.changeDayOffRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.changeDayOffRequest.successMsg'];
      this.errorMsg = res['app.changeDayOffRequest.errorMsg'];
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
     clearButton : false,// !this.readonly , // default true
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

  setFormValues(req: ChangeDayOffRequest) {
    this.requestForm.controls['OldDayOffDate'].setValue(req.OldDayOffDate);
    this.requestForm.controls['NewDayOffDate'].setValue(req.NewDayOffDate);
    //this.requestForm.controls['SignIn'].setValue(req.Shift.SignInTime);
    //this.requestForm.controls['SignOut'].setValue(req.Shift.SignOffTime);
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
    const request = {... this.requestForm.value,
        OldDayOffDate : this.formatDate(this.requestForm.get('OldDayOffDate').value),
        NewDayOffDate : this.formatDate(this.requestForm.get('NewDayOffDate').value),
        Shift: {ShiftId: this.requestForm.get('Shift').value}
       };
    this.service.addChangeDayOffRequest(request).then(res => {
      this.navigateToSearch(true);
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
