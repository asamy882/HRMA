import { Component, OnInit } from '@angular/core';
import { VacationRequestService } from '../vacation-request.service';
import { VactionRequest } from '../vacation-request.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { AuthService } from 'src/common/services/auth.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';


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
  attachment = {};
  private opener: FileOpener = new FileOpener();
  private file: File = new File();

  constructor(private service: VacationRequestService, private toastController: ToastController,
              private route: ActivatedRoute, public formBuilder: FormBuilder, private languageService: LanguageService,
              private readonly translate: TranslateService, private router: Router, private platform: Platform, 
              public authService: AuthService, public appCon: AppConstants
  ) {
    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_VACATION_REQUEST_PAGE)) {
      this.requestForm = formBuilder.group({
        FromDate: new FormControl('', [Validators.required]),
        ToDate: new FormControl('', [Validators.required]),
        VacationDays: new FormControl('', [Validators.required]),
        VacationTypeId: new FormControl('', [Validators.required]),
        Balance: new FormControl('', []),
        ExcludeWeekend: new FormControl('', []),
        Ext: new FormControl('', [Validators.required]),
        Mobile: new FormControl('', [Validators.required]),
        Remarks: new FormControl('', [])
      });
    } else {
      this.requestForm = formBuilder.group({
        FromDate: new FormControl('', [Validators.required]),
        ToDate: new FormControl('', [Validators.required]),
        VacationDays: new FormControl('', [Validators.required]),
        VacationTypeId: new FormControl('', [Validators.required]),
        Balance: new FormControl('', []),
        ExcludeWeekend: new FormControl('', []),
        Remarks: new FormControl('', [])
      });
    }
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
        this.service.getVacationRequest(req).then(res => {
          this.request = res.Item;
          this.setFormValues(this.request);
          });
        this.renderCloseButton = true;
        this.renderSaveButton = false;
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
    if (this.authService.getAllowedScreens().includes(this.appCon.MISR_VACATION_REQUEST_PAGE)) {
      this.requestForm.controls['Ext'].setValue(req.Ext);
       this.requestForm.controls['Mobile'].setValue(req.Mobile);
    }
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
    this.renderSaveButton = false;
    const excludeWeekend = this.requestForm.get('ExcludeWeekend').value;
    this.request = { ... this.requestForm.value,
      FromDate : this.formatDate(this.request.FromDate),
      ToDate : this.formatDate(this.request.ToDate),
      ExcludeWeekend : excludeWeekend ? excludeWeekend : true
     };
    if (this.replacement) {
      this.request.ReplacementId = this.replacement.EmployeeId;
    }
    this.request.Attachment = this.attachment;
    this.service.addVacationRequest(this.request).then(res => {
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

  renderAttachment() {
    const username = localStorage.getItem('username');
    return username != 'testapp' && username != 'Testapp';
  }

  uploadFile() {
    this.attachment = {};
    const attachment: any = {};
    this.attachment = attachment;
    const d: any = document.querySelector('input[type=file]');
    const file = d.files[0];
    const reader = new FileReader();
    attachment.AttachmentName = file.name;

    // reader.addEventListener('load', function() {
    //   // convert image file to base64 string
    //  // console.log(reader.result);
    //   attachment.AttachmentContent = reader.result;
    //   attachment.AttachmentType = attachment.AttachmentContent.substring(0, attachment.AttachmentContent.indexOf(','));
    //   attachment.AttachmentContent = attachment.AttachmentContent.substring(attachment.AttachmentContent.indexOf(',') + 1);
    // }, false);

    reader.onloadend = (event) => {
      if (reader.error) {
        console.log(reader.error);
      } else {
        attachment.AttachmentContent = reader.result;
        attachment.AttachmentType = attachment.AttachmentContent.substring(0, attachment.AttachmentContent.indexOf(','));
        attachment.AttachmentContent = attachment.AttachmentContent.substring(attachment.AttachmentContent.indexOf(',') + 1);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    this.attachment = attachment;
    //console.log('**** uploadFile', this.request);
  }

  downloadFile(){
    this.saveAndOpenPdf(this.request.Attachment.AttachmentContent, this.request.Attachment.AttachmentName,
      this.request.Attachment.AttachmentType);
  }

  saveAndOpenPdf(fileContent: string, fileName: string, fileType: string) {
    const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    this.file.writeFile(writeDirectory, fileName, this.convertBaseb64ToBlob(fileContent, fileType), {replace: true})
      .then(() => {
         // this.loading.dismiss();
          this.opener.open(writeDirectory + fileName, fileType.substring(fileType.indexOf(':') + 1))
              .catch(() => {
                  console.log('Error opening pdf file');
                 // this.loading.dismiss();
              });
      })
      .catch(() => {
          console.error('Error writing pdf file');
        //  this.loading.dismiss();
      });
  }

  convertBaseb64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
    }
   return new Blob(byteArrays, {type: contentType});
}
}
