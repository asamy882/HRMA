import { Component } from '@angular/core';
import { AppConstants } from 'src/common/AppConstants';
import { AuthService } from 'src/common/services/auth.service';
import { LanguageService } from 'src/common/services/language.service';
import { MyTasksService } from '../mytasks/mytasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myPhoto: any;
  myInfo: any;
  pendingTasksCount: number;
  constructor(public service: AuthService, public languageService: LanguageService,
    private myTasksService: MyTasksService,
    public appCon: AppConstants) {
    this.myPhoto = this.service.getMyPhoto();
    this.myInfo = this.service.getMyInfo();
    this.myTasksService.getMyTasks().then(res => {
      this.pendingTasksCount = res.Items.length;
    });

  }

  changeLanguage(lang) {
    this.languageService.setCurrentLanguage(lang);
  }

  clearLocalStorage() {
    const API_ENDPOINT = localStorage.getItem("API_ENDPOINT");
    const deviceId = localStorage.getItem("deviceId");
    const ShowCompanyList = localStorage.getItem("ShowCompanyList");
    localStorage.clear();
    localStorage.setItem('API_ENDPOINT', API_ENDPOINT);
    localStorage.setItem('deviceId', deviceId);
    localStorage.setItem('ShowCompanyList', ShowCompanyList);
   }

}
