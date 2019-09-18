import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponents implements OnInit {

  @Input() title: string;
  @Input() renderHomeButton = true;
  @Input() renderBackButton: false;
  @Input() renderMenuButton: false;
  @Input() backPage: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      queryParams: null
    };

    // Redirect the user
    this.router.navigate(['/home'], navigationExtras);
  }

  goToBack() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      queryParams: null
    };

    // Redirect the user
    this.router.navigate([this.backPage], navigationExtras);
  }

}
