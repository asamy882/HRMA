import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-myinformations',
  templateUrl: './myinformations.page.html',
  styleUrls: ['./myinformations.page.scss'],
})
export class MyinformationsPage implements OnInit {
  myInfo: any;
  myPhoto: any;
  constructor(private service: AuthService) { }

  ngOnInit() {
    this.myInfo = this.service.getMyInfo();
    this.myPhoto = this.service.getMyPhoto();
  }

}
