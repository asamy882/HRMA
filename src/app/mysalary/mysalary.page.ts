import { Component, OnInit } from '@angular/core';
import { MySalaryService } from './mysalary.service';

@Component({
  selector: 'app-mysalary',
  templateUrl: './mysalary.page.html',
  styleUrls: ['./mysalary.page.scss'],
})
export class MysalaryPage implements OnInit {
  periods: any[];
  monthlyPayroll: any;
  tabName: string;
  constructor(private service: MySalaryService) { }

  ngOnInit() {
    this.service.getPayrollPeriods().then(res => {
      this.periods = res.Items;
    });
  }

  getMonthlyPayroll(periodId) {
    this.tabName = null;
    this.service.getMonthlyPayroll(periodId).then(res => {
      if (res.Item) {
        this.monthlyPayroll = res.Item;
        this.tabName = 'dues';
      }
    });
  }

  switchTab(tabName) {
    this.tabName = tabName;
  }

}
