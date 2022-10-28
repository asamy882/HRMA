import { Component, OnInit } from '@angular/core';
import { PenaltyRequestService } from '../penalty-request.service';
import { NavigationExtras, Router } from '@angular/router';
import { LanguageService } from 'src/common/services/language.service';
import { AuthService } from 'src/common/services/auth.service';
import { AppConstants } from 'src/common/AppConstants';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-penalty-requests.page.html',
  styleUrls: ['./search-penalty-requests.page.scss'],
})
export class SearchPenaltyRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: PenaltyRequestService, private router: Router, 
    public languageService: LanguageService, public authService: AuthService, public appCon: AppConstants
    ) { }

  ngOnInit() {
    this.service.getMyPenaltyRequests().then(res => {
      this.requests = res.Items;
    });
  }

  getColorClass(statusId) {
    const float = this.languageService.currentLanguageIsEnglish() ? 'float-right' : 'float-left';
    if (statusId === 1) {
      return `primary ${float} cust-chip`;
    } else if (statusId === 2) {
      return `success ${float} cust-chip`;
    } else if (statusId === 3) {
      return `danger  ${float} cust-chip`;
    } else {
      return `dark  ${float} cust-chip`;
    }
  }

  goToDetails(req) {
    const navigationExtras: NavigationExtras = {
      queryParams: {req: JSON.stringify(req)},
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigate(['/penalty-request/new'], navigationExtras);
  }

}
