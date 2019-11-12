import { Component, OnInit } from '@angular/core';
import { MissionRequestService } from '../mission-request.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MissionRequest } from '../mission-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-new-mission-request',
  templateUrl: './new-mission-request.page.html',
  styleUrls: ['./new-mission-request.page.scss'],
})
export class NewMissionRequestPage implements OnInit {
  request: MissionRequest = new MissionRequest();
  appCon: AppConstants = new AppConstants();
  requestForm: FormGroup;
  timePickerObj: any = {};
  datePickerObj: any = {};
  missionTypes: any[] = [];
  missionDistances: any[] = [];
  readonly = false;
  successMsg: string;
  errorMsg: string;
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/mission-request/search';
  title = 'app.missionRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: MissionRequestService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    public authService: AuthService,
    private router: Router
  ) {
    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_MISSION_REQUEST_PAGE)) {
      this.requestForm = formBuilder.group({
        MissionDate: new FormControl('', [Validators.required]),
        MissionEndDate: new FormControl('', [Validators.required]),
        MissionTypeId: new FormControl('', [Validators.required]),
        MissionDistanceId: new FormControl('', [Validators.required]),
        FromTime: new FormControl('', [Validators.required]),
        ToTime: new FormControl('', [Validators.required]),
        ExtendNextDay: new FormControl('', []),
        Remarks: new FormControl('', []),
      });
    } else {
      this.requestForm = formBuilder.group({
        MissionDate: new FormControl('', [Validators.required]),
        MissionEndDate: new FormControl('', [Validators.required]),
        FromTime: new FormControl('', [Validators.required]),
        ToTime: new FormControl('', [Validators.required]),
        ExtendNextDay: new FormControl('', []),
        Remarks: new FormControl('', []),
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.missionRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.missionRequest.taskActionRequestPageTitle';
        this.service.getMissionRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.missionRequest.changeRequestPageTitle';
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
    this.translate.get(['app.missionRequest.successMsg', 'app.missionRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.missionRequest.successMsg'];
      this.errorMsg = res['app.missionRequest.errorMsg'];
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

    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_MISSION_REQUEST_PAGE)) {
      this.loadMissionTypes();
      this.loadMissionDistances();
    }
  }

  async loadMissionTypes() {
    this.missionTypes = this.service.getMissionTypes();
    if (!this.missionTypes) {
      this.service.loadMissionTypes().then((res) => {
        this.missionTypes = res.Items;
        localStorage.setItem('missionTypes', JSON.stringify(res.Items));
      });
    }
  }

  async loadMissionDistances() {
    this.missionDistances = this.service.getMissionDistances();
    if (!this.missionDistances) {
      this.service.loadMissionDistances().then((res) => {
        this.missionDistances = res.Items;
        localStorage.setItem('missionDistances', JSON.stringify(res.Items));
      });
    }
  }

  setFormValues(req: MissionRequest) {
    this.requestForm.controls['MissionDate'].setValue(req.MissionDate);
    this.requestForm.controls['MissionEndDate'].setValue(req.MissionEndDate);
    this.requestForm.controls['FromTime'].setValue(req.FromTime);
    this.requestForm.controls['ToTime'].setValue(req.ToTime);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
    this.requestForm.controls['ExtendNextDay'].setValue(req.ExtendNextDay);
    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_MISSION_REQUEST_PAGE)) {
      this.requestForm.controls['MissionTypeId'].setValue(req.MissionType.ID);
      this.requestForm.controls['MissionDistanceId'].setValue(req.MissionDistance.ID);
    }
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
    const extendNextDay = this.requestForm.get('ExtendNextDay').value;
    const request = {... this.requestForm.value,
        MissionDate : this.formatDate(this.requestForm.get('MissionDate').value),
        MissionEndDate : this.formatDate(this.requestForm.get('MissionEndDate').value),
        ExtendNextDay: extendNextDay ? extendNextDay : false };

    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_MISSION_REQUEST_PAGE)) {
          request.MissionType = {ID : this.requestForm.get('MissionTypeId').value};
          request.MissionDistance = {ID : this.requestForm.get('MissionDistanceId').value};
        }
    this.service.addMissionRequest(request).then(res => {
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
