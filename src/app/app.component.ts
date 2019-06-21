import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LanguageService} from '../common/services/language.service';
import {SpinnerService} from '../common/services/spinner.service';
import { LoadingController } from '@ionic/angular';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
  loading: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private spinnerService: SpinnerService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.initializeApp();
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: null,
      duration: 10000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    this.spinnerService.onLoadingChanged
      .subscribe(isLoading => {
        if (isLoading) {
          this.loading.present();
        } else {
          this.loading.dismiss();
        }
      });

    this.router.events.subscribe((route) => {
        if (route instanceof NavigationStart) {
          this.loading.present();
        }
        if (route instanceof NavigationEnd) {
          this.loading.dismiss();
        }
      });

    this.languageService.local$.subscribe(lang => {
        this.loading.hide();
      });

 //   return await this.loading.present();
  }

  ngOnInit() {
    this.presentLoadingWithOptions();

    /*const lang = localStorage.getItem('current_lang');

    if (lang === 'ar'){
     document.getElementById('arabicStyle').setAttribute('href', 'assets/rtl.css');
     } else {
     document.getElementById('arabicStyle').setAttribute('href', '');

     }*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
