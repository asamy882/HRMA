import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/common/services/auth.service';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-choose-request-type',
  templateUrl: './choose-request-type.page.html',
  styleUrls: ['./choose-request-type.page.scss'],
})
export class ChooseRequestTypePage implements OnInit {
  public appCon: AppConstants = new AppConstants();

  constructor(public service: AuthService) { }

  ngOnInit() {
  }

}
