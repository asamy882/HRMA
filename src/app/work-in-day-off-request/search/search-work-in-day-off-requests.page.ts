import { Component, OnInit } from '@angular/core';
import { WorkinDayOffRequestService } from '../work-in-day-off-request.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-work-in-day-off-requests.page.html',
  styleUrls: ['./search-work-in-day-off-requests.page.scss'],
})
export class SearchWorkinDayOffRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: WorkinDayOffRequestService, private router: Router) { }

  ngOnInit() {
    this.service.getMyWorkinDayOffRequests().subscribe(res => {
      if (res.Success) {
        this.requests = res.Items;
      }
    });
  }

  getColorClass(statusId) {
    if (statusId === 1) {
      return 'primary float-right cust-chip';
    } else if (statusId === 2) {
      return 'success float-right cust-chip';
    } else if (statusId === 3) {
      return 'danger float-right cust-chip';
    } else {
      return 'dark float-right cust-chip';
    }
  }

  goToDetails(req) {
    const navigationExtras: NavigationExtras = {
      queryParams: {req: JSON.stringify(req)},
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigate(['/work-in-day-off-request/new'], navigationExtras);
  }

}
