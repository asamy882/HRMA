import { Component, OnInit } from '@angular/core';
import { MyAttendanceService } from './myattendance.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-myattendance',
  templateUrl: './myattendance.page.html',
  styleUrls: ['./myattendance.page.scss'],
})
export class MyattendancePage implements OnInit {
  requestForm: FormGroup;
  datePickerObj: any = {};
  attendanceSheet: any[] = [];

  constructor(private service: MyAttendanceService, private toastController: ToastController,
              public formBuilder: FormBuilder) {
                this.requestForm = formBuilder.group({
                  FromDate: new FormControl('', [Validators.required]),
                  ToDate: new FormControl('', [Validators.required])
                });
              }

  ngOnInit() {
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
      clearButton: true, // default true
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

  getAttendanceSheet() {
    this.attendanceSheet = [];
    const request = { ... this.requestForm.value };
    if (request.FromDate && request.ToDate) {
      this.service.getAttendanceSheet(this.formatDate(request.FromDate),
        this.formatDate(request.ToDate)).subscribe(res => {
          if (res.Success) {
            this.attendanceSheet = res.Items;
          }
        });
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

}
