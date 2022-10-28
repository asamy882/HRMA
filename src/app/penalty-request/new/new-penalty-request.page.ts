import { Component, OnInit } from '@angular/core';
import { PenaltyRequestService } from '../penalty-request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PenaltyRequest } from '../penalty-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-new-penalty-request',
  templateUrl: './new-penalty-request.page.html',
  styleUrls: ['./new-penalty-request.page.scss'],
})
export class NewPenaltyRequestPage implements OnInit {
  request: PenaltyRequest = new PenaltyRequest();
  requestForm: FormGroup;
  datePickerObj: any = {};
  readonly = false;
  successMsg: string;
  errorMsg: string;
  employees: any[];
  penaltyReasons: any[];
  valuePenalty: string;
  daysPenalty: string;
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/penalty-request/search';
  title = 'app.penaltyRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: PenaltyRequestService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    public authService: AuthService,
    public appCon: AppConstants,
    private router: Router
  ) {
    if (authService.getAllowedScreens().includes(appCon.QT_PENALTY_REQUEST_PAGE)) {
      this.requestForm = formBuilder.group({
        PenaltyTypeId: new FormControl('', [Validators.required]),
        PenaltyValue: new FormControl('', [Validators.required]),
        PenaltyCause: new FormControl('', [Validators.required]),
        PenaltyDate: new FormControl('', [Validators.required]),
        EmployeeId: new FormControl('', [Validators.required])
      });
    } else {
      this.requestForm = formBuilder.group({
        PenaltyTypeId: new FormControl('', [Validators.required]),
        PenaltyReason: new FormControl('', [Validators.required]),
        PenaltyValue: new FormControl('', [Validators.required]),
        PenaltyCause: new FormControl('', [Validators.required]),
        PenaltyDate: new FormControl('', [Validators.required]),
        EmployeeId: new FormControl('', [Validators.required])
      });
    }
  }

  ngOnInit() {
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.penaltyRequest.successMsg', 'app.penaltyRequest.errorMsg'
                        , 'app.penaltyRequest.valuePenalty', 'app.penaltyRequest.daysPenalty']).subscribe(res => {
      this.successMsg = res['app.penaltyRequest.successMsg'];
      this.errorMsg = res['app.penaltyRequest.errorMsg'];
      this.valuePenalty = res['app.penaltyRequest.valuePenalty'];
      this.daysPenalty = res['app.penaltyRequest.daysPenalty'];
    });
    this.loadEmployees();

    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.penaltyRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.renderCloseButton = false;
        this.readonly = true;
        this.renderCloseButton = false;
        this.title = 'app.penaltyRequest.taskActionRequestPageTitle';
        this.service.getPenaltyRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.penaltyRequest.changeRequestPageTitle';
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

    this.loadPenaltyReasons();
    // EXAMPLE OBJECT
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
      clearButton: false,//!this.readonly, // default true
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

  async loadEmployees() {
    this.service.getEmployeesForPenaltyRequest().then((res) => {
      this.employees = res.Items;
    });
  }

  async loadPenaltyReasons() {
    this.service.getPenaltyReasons().then((res) => {
      this.penaltyReasons = res.Items;
    });
  }

  reasonChanged() {
    const request = {... this.requestForm.value};
    if (request.EmployeeId && request.PenaltyReason && request.PenaltyDate) {
      this.service.getPenaltyReasonPolicyForEmployee(request.EmployeeId, request.PenaltyReason, request.PenaltyDate).then( res => {
        if (res.Item) {
          this.requestForm.controls['PenaltyTypeId'].setValue(res.Item.PenlatyTypeId);
          this.requestForm.controls['PenaltyValue'].setValue(res.Item.PenlatyValue);
          this.request.PenaltyTypeName = res.Item.PenlatyTypeId.PenaltyTypeId == 1 ? this.valuePenalty : this.daysPenalty;
        } else {
          this.requestForm.controls['PenaltyTypeId'].setValue('');
          this.requestForm.controls['PenaltyValue'].setValue('');
          this.request.PenaltyTypeName = null;
        }
      });
    }
  }

  setFormValues(req: PenaltyRequest) {
    this.requestForm.controls['PenaltyTypeId'].setValue(req.PenaltyTypeId);
    if (!this.authService.getAllowedScreens().includes(this.appCon.QT_PENALTY_REQUEST_PAGE)) {
      this.requestForm.controls['PenaltyReason'].setValue(req.PenaltyReason.ID);
    }
    if(req.PenaltyTypeId == 2 && this.authService.getAllowedScreens().includes(this.appCon.QT_PENALTY_REQUEST_PAGE) && req.DeductionFactor) {
      this.requestForm.controls['PenaltyValue'].setValue(req.DeductionFactor);
    } else {
      this.requestForm.controls['PenaltyValue'].setValue(req.PenaltyValue);
    }
    this.requestForm.controls['PenaltyCause'].setValue(req.PenaltyCause);
    this.requestForm.controls['PenaltyDate'].setValue(req.PenaltyDate);
    this.requestForm.controls['EmployeeId'].setValue(req.Employee.EmployeeId);
    this.request.PenaltyTypeName = req.PenaltyTypeId == 1 ? this.valuePenalty : this.daysPenalty;
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
      PenaltyDate: this.formatDate(this.requestForm.get('PenaltyDate').value),
      PenaltyReason: {ID: this.requestForm.value.PenaltyReason}};
    this.service.addPenaltyRequest(request).then(res => {
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
    this.router.navigate(['/penalty-request/search'], navigationExtras).then(() => {
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
