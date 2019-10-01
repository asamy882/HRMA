import { Component } from '@angular/core';
import { AuthService } from 'src/common/services/auth.service';
import { LanguageService } from 'src/common/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myPhoto: any;
  myInfo: any;
  constructor(private service: AuthService, public languageService: LanguageService) {
    this.myPhoto = this.service.getMyPhoto();
    this.myInfo = this.service.getMyInfo();
  }

  changeLanguage(lang) {
    this.languageService.setCurrentLanguage(lang);
  }

}
