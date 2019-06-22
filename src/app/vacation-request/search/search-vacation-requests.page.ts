import { Component, OnInit } from '@angular/core';
import { VacationRequestService } from '../vacation-request.service';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-vacation-requests.page.html',
  styleUrls: ['./search-vacation-requests.page.scss'],
})
export class SearchVacationRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: VacationRequestService) { }

  ngOnInit() {
    this.service.getMyVacationRequests().subscribe(res => {
      if (res.Success) {
        this.requests = res.Items;
      }
    });
  }

}
