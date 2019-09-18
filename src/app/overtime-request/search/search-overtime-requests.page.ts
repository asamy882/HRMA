import { Component, OnInit } from '@angular/core';
import { OvertimeRequestService } from '../overtime-request.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-overtime-requests.page.html',
  styleUrls: ['./search-overtime-requests.page.scss'],
})
export class SearchOvertimeRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: OvertimeRequestService, private router: Router) { }

  ngOnInit() {
    this.service.getMyOvertimeRequests().subscribe(res => {
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
    this.router.navigate(['/overtime-request/new'], navigationExtras);
  }

}
