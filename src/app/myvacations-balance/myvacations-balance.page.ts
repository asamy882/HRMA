import { Component, OnInit } from '@angular/core';
import { MyVacationsBalanceService } from './myvacations-balance.service';
import { Router, NavigationExtras } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';
import { LanguageService } from 'src/common/services/language.service';

@Component({
  selector: 'app-myVacationsBalance',
  templateUrl: './myvacations-balance.page.html',
  styleUrls: ['./myvacations-balance.page.scss'],
})
export class MyVacationsBalancePage implements OnInit {

  myVacationsBalance: any[] = [];

  constructor(private service: MyVacationsBalanceService, private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.myVacationsBalance = [];
    this.service.getMyVacationsBalance().then(res => {
      this.myVacationsBalance = this.myVacationsBalance.concat(res.Items);
    });
  }

}
