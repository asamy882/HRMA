import { Component, OnInit } from '@angular/core';
import { VacationRequestService } from '../vacation-request.service';
import { VactionRequest } from '../vacation-request.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';


@Component({
  selector: 'app-new-vacation-request',
  templateUrl: './new-vacation-request.page.html',
  styleUrls: ['./new-vacation-request.page.scss'],
})
export class NewVacationRequestPage implements OnInit {
  request: VactionRequest = new VactionRequest();
  portsSubscription: Subscription;
  vacationTypeList: any[];
  employees: any[];
  replacement: any;
  requestForm: FormGroup;
  datePickerObj: any = {};
  readonly = false;
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  renderTaskActions: boolean;
  successMsg: string;
  errorMsg: string;
  backPage = '/vacation-request/search';
  title = 'app.vacationRequest.newRequestPageTitle';
  selectReplacement: string;

  constructor(private service: VacationRequestService, private toastController: ToastController,
              private route: ActivatedRoute, public formBuilder: FormBuilder, private languageService: LanguageService,
              private readonly translate: TranslateService, private router: Router
  ) {
    this.requestForm = formBuilder.group({
      FromDate: new FormControl('', [Validators.required]),
      ToDate: new FormControl('', [Validators.required]),
      VacationDays: new FormControl('', [Validators.required]),
      VacationTypeId: new FormControl('', [Validators.required]),
      Balance: new FormControl('', []),
      ExcludeWeekend: new FormControl('', []),
      Remarks: new FormControl('', [])
    //  Replacement: new FormControl('', []),
    });
  }

  ngOnInit() {
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.vacationRequest.successMsg', 'app.vacationRequest.errorMsg'
       ,'app.vacationRequest.selectReplacement']).subscribe(res => {
      this.successMsg = res['app.vacationRequest.successMsg'];
      this.errorMsg = res['app.vacationRequest.errorMsg'];
      this.selectReplacement = res['app.vacationRequest.selectReplacement'];
    });
    this.route.queryParams.subscribe(params => {
      const req = params['req'];
      const requestId = params['requestId'];
      if (req) {
        this.readonly = true;
        this.title = 'app.vacationRequest.viewRequestPageTitle';
        this.request = JSON.parse(req);
        this.setFormValues(this.request);
        this.renderCloseButton = true;
      } else if (requestId) {
        this.backPage = '/mytasks';
        this.readonly = true;
        this.title = 'app.vacationRequest.taskActionRequestPageTitle';
        this.service.getVacationRequest(requestId).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          if (this.request.AllowedActions == AppConstants.INITIATE) {
            this.title = 'app.vacationRequest.changeRequestPageTitle';
            this.renderSaveButton = true;
            this.replacement = {EmployeeId : this.request.ReplacementId, EmployeeName: this.request.ReplacementName};
            this.readonly = false;
          } else {
            this.renderTaskActions = true;
          }
          });
      } else {
        this.renderSaveButton = true;
        //this.replacement = {EmployeeId : 0, EmployeeName: this.selectReplacement};
      }
    });
    this.loadVacationTypeList();
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

  setFormValues(req: VactionRequest) {
    this.requestForm.controls['Balance'].setValue(req.Balance);
    this.requestForm.controls['ExcludeWeekend'].setValue(req.ExcludeWeekend);
    this.requestForm.controls['FromDate'].setValue(req.FromDate);
    this.requestForm.controls['Remarks'].setValue(req.Remarks);
    this.requestForm.controls['ToDate'].setValue(req.ToDate);
    this.requestForm.controls['VacationDays'].setValue(req.VacationDays);
    this.requestForm.controls['VacationTypeId'].setValue(req.VacationTypeId);
    //this.requestForm.controls['Replacement'].setValue(req.Balance);
  }

  async loadVacationTypeList() {
    this.vacationTypeList = this.service.getVacationTypes();
    if (!this.vacationTypeList) {
      this.service.loadVacationTypes().then((res) => {
        this.vacationTypeList = res.Items;
        localStorage.setItem('vacationTypes', JSON.stringify(res.Items));
      });
    }
  }

  getVacationTypeBalance() {
    if (!this.readonly) {
      this.request = { ... this.requestForm.value };
      if (this.request.FromDate && this.request.ToDate && this.request.VacationTypeId) {
        this.service.getVacationTypeBalance(this.request.VacationTypeId, this.formatDate(this.request.FromDate),
          this.formatDate(this.request.ToDate)).then(res => {
            this.requestForm.controls['Balance'].setValue(res.Item);
            this.calculateVacationDays();
          });
      }
    }
  }

  calculateVacationDays() {
    if (!this.readonly) {
      this.request = { ... this.requestForm.value };
      if (this.request.FromDate && this.request.ToDate && this.request.VacationTypeId) {
        this.request.FromDate = this.formatDate(this.request.FromDate);
        this.request.ToDate = this.formatDate(this.request.ToDate);
        this.service.calculateVacationDays(this.request).then(res => {
          this.requestForm.controls['VacationDays'].setValue(res.Item.VacationDays);
        });
    }
    }
  }

  /*filterEmployee(ports: Port[], text: string) {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1;
    });
  }*/

  searchEmployee(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.portsSubscription = this.service.getReplacements(text, text).subscribe(res => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription.closed) {
        return;
      }

      // We get all ports and then filter them at the front-end,
      // however, filtering can be parameterized and moved to a back-end.
      // event.component.items = this.filterEmployee(ports, text);

      event.component.items = res.Items;
      event.component.endSearch();
    });
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
    const excludeWeekend = this.requestForm.get('ExcludeWeekend').value;
    this.request = { ... this.requestForm.value,
      FromDate : this.formatDate(this.request.FromDate),
      ToDate : this.formatDate(this.request.ToDate),
      ExcludeWeekend : excludeWeekend ? excludeWeekend : true
     };
    if (this.replacement) {
      this.request.ReplacementId = this.replacement.EmployeeId;
    }
    this.service.addVacationRequest(this.request).then(res => {
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
