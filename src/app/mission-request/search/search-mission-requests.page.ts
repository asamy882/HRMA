import { Component, OnInit } from '@angular/core';
import { MissionRequestService } from '../mission-request.service';

@Component({
  selector: 'app-search-vaction-requests',
  templateUrl: './search-mission-requests.page.html',
  styleUrls: ['./search-mission-requests.page.scss'],
})
export class SearchMissionRequestsPage implements OnInit {

  requests: any[] = [];

  constructor(private service: MissionRequestService) { }

  ngOnInit() {
    this.service.getMyMissionRequests().subscribe(res => {
      if (res.Success) {
        this.requests = res.Items;
      }
    });
  }

}
