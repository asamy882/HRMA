import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/common/services/auth.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
   myInfo: any;
   myPhoto: any;

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.myInfo = this.service.getMyInfo();
    this.myPhoto = this.service.getMyPhoto();
  }

}
