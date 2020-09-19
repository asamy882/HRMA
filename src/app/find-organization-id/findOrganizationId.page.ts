import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getOrganizationId',
  templateUrl: './findOrganizationId.page.html',
  styleUrls: ['./findOrganizationId.page.scss'],
})
export class FindOrganizationIdPage implements OnInit {
  title: "Find Your Organization ID";
  backPage = '/endpoint';

  constructor() { }

  ngOnInit() {
  }

}
