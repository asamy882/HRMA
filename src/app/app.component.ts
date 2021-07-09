
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LanguageService } from '../common/services/language.service';
import { SpinnerService } from '../common/services/spinner.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/common/services/auth.service';
import { LoadingService } from 'src/common/services/loading.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'app.menu.home',
      url: '/home',
      icon: 'home'
    },
    //mine start 
    {
      title: 'app.menu.mytasks',
      url: '/mytasks',
      icon: 'list'
    },
    {
      title: 'app.menu.requests',
      url: '/choose-request-type',
      icon: 'clipboard'
    },
    {
      title: 'app.menu.myinformations',
      url: '/myinformations',
      icon: 'information-circle-outline'
        },
    //mine end
   /*  {
      title: 'app.vacationRequest.myRequestsTitle',
      url: '/vacation-request/search',
      icon: 'list-box'
    },
    {
      title: 'app.vacationRequest.newRequestPageTitle',
      url: '/vacation-request/new',
      icon: 'clipboard'
    },
    {
      title: 'app.overtimeRequest.newRequestPageTitle',
      url: '/overtime-request/new',
      icon: 'football'
    },
    {
      title: 'app.overtimeRequest.myRequestsTitle',
      url: '/overtime-request/search',
      icon: 'football'
    },*/
    {
      title: 'app.logout',
      url: '/logout',
      icon: 'log-out'
    }
  ];
  /*
  pages = [
    {
      title: 'Main',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Cool Frameworks',
      children: [
        {
          title: 'Ionic',
          url: '/menu/ionic',
          icon: 'logo-ionic'
        },
        {
          title: 'Flutter',
          url: '/menu/flutter',
          icon: 'logo-google'
        },
      ]
    }
  ];*/
  loading: any;
  myInfo: any;
  myPhoto: any;

  constructor(
    private platform: Platform,
    public languageService: LanguageService,
    private spinnerService: SpinnerService,
    public router: Router,
    public service: AuthService,
    public loadingService: LoadingService,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  logout() {
    const API_ENDPOINT = localStorage.getItem("API_ENDPOINT");
    const deviceId = localStorage.getItem("deviceId");
    localStorage.clear();
    localStorage.setItem('API_ENDPOINT', API_ENDPOINT);
    localStorage.setItem('deviceId', deviceId);
  }
  async presentLoadingWithOptions() {
    this.spinnerService.onLoadingChanged
      .subscribe(isLoading => {
        if (isLoading) {
          this.loadingService.present().catch((res) => {});
        } else {
         this.loadingService.dismiss().catch((res) => {});
        }
      });

    this.router.events.subscribe((route) => {
        if (route instanceof NavigationStart) {
         // this.loadingService.present();
        }
        if (route instanceof NavigationEnd) {
         // this.loadingService.dismiss();
        }
      });

    this.languageService.local$.subscribe(lang => {
      this.loadingService.dismiss().catch((res) => {});
      });
  }

  ngOnInit() { 
    
    this.myPhoto = this.service.getMyPhoto();
    this.myInfo = this.service.getMyInfo();

    /*const lang = localStorage.getItem('current_lang');

    if (lang === 'ar'){
     document.getElementById('arabicStyle').setAttribute('href', 'assets/rtl.css');
     } else {
     document.getElementById('arabicStyle').setAttribute('href', '');

     }*/
  }

  

  initializeApp() {
    this.platform.ready().then(() => {
      this.presentLoadingWithOptions();
     // this.statusBar.styleDefault();
    this.splashScreen.hide();
    // this.statusBar.overlaysWebView(true);
    // this.statusBar.backgroundColorByHexString('#3880ff');
     //this.statusBar.hide();
    });
  }
}
