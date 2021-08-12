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
import { ModalController, ToastController } from '@ionic/angular';
import { LocationMissionRequestPage } from '../location/location-mission-request.page';
import { SignInOutService } from 'src/app/sign-in-out/sign-in-out.service';

@Component({
  selector: 'app-new-mission-request',
  templateUrl: './new-mission-request.page.html',
  styleUrls: ['./new-mission-request.page.scss'],
})
export class NewMissionRequestPage implements OnInit {
  request: MissionRequest = new MissionRequest();
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
  branchs: any[];
  backPage = '/mission-request/search';
  title = 'app.missionRequest.newRequestPageTitle';
  workMissionText: string;
  workFromHomeText: string;
  emptyLocationErrorMsg: string;

  constructor(
    public formBuilder: FormBuilder,
    private service: MissionRequestService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    public authService: AuthService,
    private router: Router,
    public appCon: AppConstants,
    private signInOutService: SignInOutService,
    private toastController: ToastController,
    public modalController: ModalController
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
        Ext: new FormControl('', [Validators.required]),
        Mobile: new FormControl('', [Validators.required]),
        Remarks: new FormControl('', [])
      });
    } else if (this.authService.getAllowedScreens().includes(this.appCon.ARABIA_MISSION_REQUEST_PAGE)) {
      this.requestForm = formBuilder.group({
        MissionDate: new FormControl('', [Validators.required]),
        MissionEndDate: new FormControl('', [Validators.required]),
        MissionTypeId: new FormControl('', [Validators.required]),
        FromTime: new FormControl('', [Validators.required]),
        ToTime: new FormControl('', [Validators.required]),
        ExtendNextDay: new FormControl('', []),
        Remarks: new FormControl('', [])
      });
    } else {
      this.requestForm = formBuilder.group({
        MissionDate: new FormControl('', [Validators.required]),
        MissionEndDate: new FormControl('', [Validators.required]),
        FromTime: new FormControl('', [Validators.required]),
        ToTime: new FormControl('', [Validators.required]),
        ExtendNextDay: new FormControl('', []),
        Remarks: new FormControl('', [])
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
    this.translate.get(['app.missionRequest.successMsg', 'app.missionRequest.errorMsg', 'app.missionRequest.workMission', 'app.missionRequest.workFromHome', 'app.missionRequest.EmptyLocationErrorMsg']).subscribe(res => {
      this.successMsg = res['app.missionRequest.successMsg'];
      this.errorMsg = res['app.missionRequest.errorMsg'];
      this.workMissionText = res['app.missionRequest.workMission'];
      this.workFromHomeText = res['app.missionRequest.workFromHome'];
      this.emptyLocationErrorMsg = res['app.missionRequest.EmptyLocationErrorMsg'];
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
      clearButton: false,// !this.readonly , // default true
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

    if (this.authService.getAllowedScreens().includes(this.appCon.ARABIA_MISSION_REQUEST_PAGE)) {
      this.loadOutsideLocations();
    }

  }

  async loadOutsideLocations() {
    this.signInOutService.getOutsideLocations().then((res) => {
      this.branchs = res.Items;
    });
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
      this.requestForm.controls['Ext'].setValue(req.Ext);
      this.requestForm.controls['Mobile'].setValue(req.Mobile);
    }
    if (this.authService.getAllowedScreens().includes(this.appCon.ARABIA_MISSION_REQUEST_PAGE)) {
      this.requestForm.controls['MissionTypeId'].setValue(req.MissionTypeId);
    }
  }

  formatDate(date) {
    const d = new Date(date),
      year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
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
    const request = {
      ... this.requestForm.value,
      MissionDate: this.formatDate(this.requestForm.get('MissionDate').value),
      MissionEndDate: this.formatDate(this.requestForm.get('MissionEndDate').value),
      ExtendNextDay: extendNextDay ? extendNextDay : false
    };

    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_MISSION_REQUEST_PAGE)) {
      request.MissionType = { ID: this.requestForm.get('MissionTypeId').value };
      request.MissionDistance = { ID: this.requestForm.get('MissionDistanceId').value };
    }
    if (this.authService.getAllowedScreens().includes(this.appCon.ARABIA_MISSION_REQUEST_PAGE)) {
      if(this.requestForm.get('MissionTypeId').value == this.appCon.WORK_MISSION && (!this.request.Locations || this.request.Locations.length == 0))
      {
        this.displayErrorMsg(this.emptyLocationErrorMsg);
        this.renderSaveButton = true;
        return;
      }
     // request.MissionType = { ID: this.requestForm.get('MissionTypeId').value };
      request.Locations = this.request.Locations;
    }
    this.service.addMissionRequest(request).then(res => {
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

  renderAddLocationButton() {
    return this.authService.getAllowedScreens().includes(this.appCon.ARABIA_MISSION_REQUEST_PAGE) 
            && this.requestForm.get('MissionTypeId').value == this.appCon.WORK_MISSION && this.renderSaveButton
            && (!this.request.Locations || this.request.Locations.length < this.appCon.MAX_MISSION_LOCATIONS);
  }

  renderLocationsGrid() {
    return this.authService.getAllowedScreens().includes(this.appCon.ARABIA_MISSION_REQUEST_PAGE) 
            && this.requestForm.get('MissionTypeId').value == this.appCon.WORK_MISSION
            && this.request.Locations && this.request.Locations.length > 0;
  }

  removeLocation(location){
    this.request.Locations = this.request.Locations.filter(l => l.LocationId != location.LocationId);
  }


  async presentModal() {
    const locations = this.request.Locations ? this.request.Locations.map(l => parseInt(l.LocationId)) : [];
    const sits = this.branchs.filter(b => !locations.includes(b.ID));
    const modal = await this.modalController.create({
      component: LocationMissionRequestPage,
      componentProps: {
        'branchs': sits
      }  
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null && modalDataResponse.data && modalDataResponse.data.LocationId != "") {
        if(!this.request.Locations){
          this.request.Locations = [modalDataResponse.data];
        } else {
          this.request.Locations.push(modalDataResponse.data);
        }
        
      }
    });

    return await modal.present();
  }

  typeChanged(){
  }
  
  getMissionTypeText(){
    if(this.request.MissionTypeId == this.appCon.WORK_MISSION)
      return this.workMissionText;
    if(this.request.MissionTypeId == this.appCon.WORK_FROM_HOME)
      return this.workFromHomeText;
  }

  async displayErrorMsg(errorMsg) {
    const toast = await this.toastController.create({
      message: errorMsg,
      cssClass: 'error',
      duration: 5000
    });
    toast.present();
  }
}
