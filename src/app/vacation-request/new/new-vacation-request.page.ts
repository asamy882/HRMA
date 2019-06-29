import { Component, OnInit } from '@angular/core';
import { VacationRequestService } from '../vacation-request.service';
import { VactionRequest } from '../vacation-request.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


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

  constructor(private service: VacationRequestService, private toastController: ToastController, public formBuilder: FormBuilder
    ) {
      this.requestForm = formBuilder.group({
        FromDate: new FormControl('', [Validators.required]),
        ToDate: new FormControl('', [Validators.required]),
        VacationDays: new FormControl('', [Validators.required]),
        VacationTypeId: new FormControl('', [Validators.required]),
        Balance: new FormControl('', []),
        ExcludeWeekend: new FormControl('', []),
        Replacement: new FormControl('', []),
        Remarks: new FormControl('', []),
      });
    }

  ngOnInit() {
    this.loadVacationTypeList();
  }

  async loadVacationTypeList() {
    this.vacationTypeList = this.service.getVacationTypes();
    if (!this.vacationTypeList) {
      this.service.loadVacationTypes().subscribe(() => {
        this.vacationTypeList = this.service.getVacationTypes();
      });
    }
  }

  getVacationTypeBalance() {
    this.request = {... this.requestForm.value};
    console.log(this.request);
    console.log(this.requestForm.value);
    if (this.request.FromDate && this.request.ToDate && this.request.VacationTypeId) {
      this.service.getVacationTypeBalance(this.request.VacationTypeId, this.formatDate(this.request.FromDate),
        this.formatDate(this.request.ToDate)).subscribe(res => {
        if (res.Success) {
          this.request.Balance = res.Item;
          this.calculateVacationDays();
        }
      });
    }
  }

  calculateVacationDays() {
    if (this.request.FromDate && this.request.ToDate && this.request.VacationTypeId) {
      this.request.FromDate = this.formatDate(this.request.FromDate);
      this.request.ToDate = this.formatDate(this.request.ToDate);
      this.service.calculateVacationDays(this.request).subscribe(res => {
        if (res.Success) {
          this.request.VacationDays = res.Item.VacationDays;
        }
      });
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
    if (this.replacement) {
      this.request.ReplacementId = this.replacement.EmployeeId;
    }
    this.service.addVacationRequest(this.request).subscribe(res => {
      if (res.Success) {
        this.displayErrorMsg('The request added Successfully', 'success');
      }
    });

  }

  async displayErrorMsg(msg, cal) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: cal,
      duration: 5000
    });
    toast.present();
  }
}
