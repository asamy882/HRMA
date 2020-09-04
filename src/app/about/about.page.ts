import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private router: Router) {
    if(AppConstants.getApiEndpoin()){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
  }

}
