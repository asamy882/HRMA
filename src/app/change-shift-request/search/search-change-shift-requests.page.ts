import { Component, OnInit } from '@angular/core';
import { ChangeShiftRequestService } from '../change-shift-request.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-change-shift-requests.page.html',
  styleUrls: ['./search-change-shift-requests.page.scss'],
})
export class SearchChangeShiftRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: ChangeShiftRequestService, private router: Router) { }

  ngOnInit() {
    this.service.getMyChangeShiftRequests().subscribe(res => {
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
    this.router.navigate(['/change-shift-request/new'], navigationExtras);
  }

}
