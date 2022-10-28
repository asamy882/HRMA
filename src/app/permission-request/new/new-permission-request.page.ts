import { Component, OnInit } from '@angular/core';
import { PermissionRequestService } from '../permission-request.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PermissionRequest } from '../permission-request.model';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-new-permission-request',
  templateUrl: './new-permission-request.page.html',
  styleUrls: ['./new-permission-request.page.scss'],
})
export class NewPermissionRequestPage implements OnInit {
  request: PermissionRequest = new PermissionRequest();
  requestForm: FormGroup;
  timePickerObj: any = {};
  datePickerObj: any = {};
  readonly = false;
  successMsg: string;
  errorMsg: string;
  permissionTypeList: any[];
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  backPage = '/permission-request/search';
  title = 'app.permissionRequest.newRequestPageTitle';

  constructor(
    public formBuilder: FormBuilder,
    private service: PermissionRequestService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private router: Router,
    public authService: AuthService, 
    public appCon: AppConstants
  ) {
    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_PERMISSION_REQUEST_PAGE)) {
      this.requestForm = formBuilder.group({
        PermissionTypeId: new FormControl('', [Validators.required]),
        PermissionDate: new FormControl('', [Validators.required]),
        FromTime: new FormControl('', [Validators.required]),
        ToTime: new FormControl('', [Validators.required]),
        Ext: new FormControl('', [Validators.required]),
        Mobile: new FormControl('', [Validators.required]),
        Remarks: new FormControl('', [])
      });
    } else {
      this.requestForm = formBuilder.group({
        PermissionTypeId: new FormControl('', [Validators.required]),
        PermissionDate: new FormControl('', [Validators.required]),
        FromTime: new FormControl('', [Validators.required]),
        ToTime: new FormControl('', [Validators.required]),
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
        this.title = 'app.permissionRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.renderCloseButton = false;
        this.readonly = true;
        this.title = 'app.permissionRequest.taskActionRequestPageTitle';
        this.service.getPermissionRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.permissionRequest.changeRequestPageTitle';
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
    this.loadPermissionTypeList();
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.permissionRequest.successMsg', 'app.permissionRequest.errorMsg']).subscribe(res => {
      this.successMsg = res['app.permissionRequest.successMsg'];
      this.errorMsg = res['app.permissionRequest.errorMsg'];
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

  async loadPermissionTypeList() {
    this.permissionTypeList = this.service.getPermissionTypes();
    if (!this.permissionTypeList) {
      this.service.loadPermissionTypes().then((res) => {
        this.permissionTypeList = res.Items;
      //  localStorage.setItem('permissionTypes', JSON.stringify(res.Items));
      });
    }
  }


  setFormValues(req: PermissionRequest) {
    this.requestForm.controls['PermissionDate'].setValue(req.PermissionDate);
    this.requestForm.controls['FromTime'].setValue(req.FromTime);
    this.requestForm.controls['ToTime'].setValue(req.ToTime);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
    this.requestForm.controls['PermissionTypeId'].setValue(req.PermissionType.ID);
    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_PERMISSION_REQUEST_PAGE)) {
      this.requestForm.controls['Ext'].setValue(req.Ext);
      this.requestForm.controls['Mobile'].setValue(req.Mobile);
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
    var fromTime="";
    var fromHours = new Date(this.requestForm.controls['FromTime'].value).getHours();
    var fromMinutes = new Date(this.requestForm.controls['FromTime'].value).getMinutes();    
    if(fromHours > 12){
      fromHours = fromHours - 12;
      fromTime = (fromHours < 10 ? "0" : "") + fromHours + ":" + (fromMinutes > 10 ? fromMinutes : "0" + fromMinutes) + " PM";
    } else {
      fromTime = (fromHours < 10 ? "0" : "" )+ fromHours + ":" + (fromMinutes > 10 ? fromMinutes : "0" + fromMinutes) + " AM";
    }

    var toTime="";
    var toHours = new Date(this.requestForm.controls['ToTime'].value).getHours();
    var toMinutes = new Date(this.requestForm.controls['ToTime'].value).getMinutes();    
    if(toHours > 12){
      toHours = toHours - 12;
      toTime = (toHours < 10 ? "0" : "") + toHours + ":" + (toMinutes > 10 ? toMinutes : "0" + toMinutes) + " PM";
    } else {
      toTime = (toHours < 10 ? "0" : "") + toHours + ":" + (toMinutes > 10 ? toMinutes : "0" + toMinutes) + " AM";
    }
    this.renderSaveButton = false;
    const request = {... this.requestForm.value,
        FromTime: fromTime,
        ToTime: toTime,
        PermissionType: {ID: this.requestForm.get('PermissionTypeId').value},
        PermissionDate: this.formatDate(this.requestForm.get('PermissionDate').value)
       };
    this.service.addPermissionRequest(request).then(res => {
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
