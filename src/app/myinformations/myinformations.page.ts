import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/common/services/auth.service';
import { LanguageService } from 'src/common/services/language.service';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-myinformations',
  templateUrl: './myinformations.page.html',
  styleUrls: ['./myinformations.page.scss'],
})
export class MyinformationsPage implements OnInit {
  myInfo: any;
  myPhoto: any;
  constructor(public service: AuthService, public languageService: LanguageService, public appCon: AppConstants) { }

  ngOnInit() {
    this.myInfo = this.service.getMyInfo();
    this.myPhoto = this.service.getMyPhoto();
  }

}
