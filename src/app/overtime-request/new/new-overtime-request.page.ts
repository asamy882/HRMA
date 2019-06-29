import { Component, OnInit } from '@angular/core';
import { OvertimeRequestService } from '../overtime-request.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-overtime-request',
  templateUrl: './new-overtime-request.page.html',
  styleUrls: ['./new-overtime-request.page.scss'],
})
export class NewOvertimeRequestPage implements OnInit {

  requestForm: FormGroup;
  timePickerObj: any = {};

  constructor(
    public formBuilder: FormBuilder,
    private service: OvertimeRequestService,
    private toastController: ToastController
  ) {
    this.requestForm = formBuilder.group({
      OvertimeDate: new FormControl('', [Validators.required]),
      FromTime: new FormControl('', [Validators.required]),
      ToTime: new FormControl('', [Validators.required]),
      ExtendNextDay: new FormControl('', []),
      Remarks: new FormControl('', []),
    });
  }

  ngOnInit() {
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
        OvertimeDate : this.formatDate(this.requestForm.get('OvertimeDate').value),
        ExtendNextDay: extendNextDay ? extendNextDay : false };
    this.service.addOvertimeRequest(request).subscribe(res => {
      if (res.Success) {
        this.displayMsg('The request added Successfully', 'success');
      } else {
        this.displayMsg( res.Message, 'error');
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
}
