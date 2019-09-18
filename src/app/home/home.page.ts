import { Component } from '@angular/core';
import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myPhoto: any;
  myInfo: any;
  constructor(private service: AuthService) {
    this.myPhoto = this.service.getMyPhoto();
    this.myInfo = this.service.getMyInfo();
  }

}
