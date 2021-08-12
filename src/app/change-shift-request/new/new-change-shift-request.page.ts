import { Component, OnInit } from '@angular/core';
import { ChangeShiftRequestService } from '../change-shift-request.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChangeShiftRequest } from '../change-shift-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-new-change-shift-request',
  templateUrl: './new-change-shift-request.page.html',
  styleUrls: ['./new-change-shift-request.page.scss'],
})
export class NewChangeShiftRequestPage implements OnInit {
  request: ChangeShiftRequest = new ChangeShiftRequest();
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
  backPage = '/change-shift-request/search';
  title = 'app.changeShiftRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: ChangeShiftRequestService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private router: Router
  ) {
    this.requestForm = formBuilder.group({
      EmployeeShiftDate: new FormControl('', [Validators.required]),
      NewShift: new FormControl('', [Validators.required]),
      Remarks: new FormControl('', []),
    });
  }

  shiftChanged(shiftId) {
    this.request.NewShift =  this.employeeShifts.filter(s => s.ShiftId == shiftId)[0];
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.changeShiftRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.changeShiftRequest.taskActionRequestPageTitle';
        this.service.getChangeShiftRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.changeShiftRequest.changeRequestPageTitle';
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
    this.loadEmployeeShifts();
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.changeShiftRequest.successMsg', 'app.changeShiftRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.changeShiftRequest.successMsg'];
      this.errorMsg = res['app.changeShiftRequest.errorMsg'];
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

  async loadEmployeeShifts() {
    this.service.getEmployeeShifts().then((res) => {
      this.employeeShifts = res.Items;
    });
  }

  setFormValues(req: ChangeShiftRequest) {
    this.requestForm.controls['EmployeeShiftDate'].setValue(req.EmployeeShiftDate);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
    this.requestForm.controls['NewShift'].setValue(req.NewShift.ShiftId);
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
        NewShift: {ShiftId: this.requestForm.get('NewShift').value}
       };
    this.service.addChangeShiftRequest(request).then(res => {
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
