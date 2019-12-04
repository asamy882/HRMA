import { Component, OnInit } from '@angular/core';
import { MyShiftScheduleService } from './myshift-schedule.service';
import { Router, NavigationExtras } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { LanguageService } from 'src/common/services/language.service';

@Component({
  selector: 'app-myShiftSchedule',
  templateUrl: './myshift-schedule.page.html',
  styleUrls: ['./myshift-schedule.page.scss'],
})
export class MyShiftSchedulePage implements OnInit {

  myShiftSchedule: any[] = [];

  constructor(private service: MyShiftScheduleService, private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.myShiftSchedule = [];
    this.service.getMyShiftSchedule().then(res => {
      this.myShiftSchedule = this.myShiftSchedule.concat(res.Items);
    });
  }

}
