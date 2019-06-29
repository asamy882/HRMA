import { Component, OnInit } from '@angular/core';
import { OvertimeRequestService } from '../overtime-request.service';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-overtime-requests.page.html',
  styleUrls: ['./search-overtime-requests.page.scss'],
})
export class SearchOvertimeRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: OvertimeRequestService) { }

  ngOnInit() {
    this.service.getMyOvertimeRequests().subscribe(res => {
      if (res.Success) {
        this.requests = res.Items;
      }
    });
  }

}
