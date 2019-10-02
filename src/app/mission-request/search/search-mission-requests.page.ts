import { Component, OnInit } from '@angular/core';
import { MissionRequestService } from '../mission-request.service';
import { NavigationExtras, Router } from '@angular/router';
import { LanguageService } from 'src/common/services/language.service';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-mission-requests.page.html',
  styleUrls: ['./search-mission-requests.page.scss'],
})
export class SearchMissionRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: MissionRequestService, private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.service.getMyMissionRequests().subscribe(res => {
      if (res.Success) {
        this.requests = res.Items;
      }
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
    this.router.navigate(['/mission-request/new'], navigationExtras);
  }

}
