import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/common/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../common/services/language.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  companyList: any [];
  errorMsg: string;
  loading: any;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router,
              private toastController: ToastController, private languageService: LanguageService,
              private readonly translate: TranslateService) {
    this.authForm = fb.group({
      username: [null, Validators.compose([Validators.required])],
      company: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      keepMeLogin :[false]
    });
   }

  ngOnInit() {
    this.translate.use(this.languageService.currentLang);
    const keepMeLogin = localStorage.getItem('keepMeLogin');
    if(keepMeLogin && keepMeLogin === 'true'){
      this.keepMeLoginFun();
     // this.navCtrl.setRoot('HomePage');
    } else {
      this.service.getCompanies().subscribe(res => {
        this.companyList = res.Items;
      });
    }
  }

  async keepMeLoginFun() {
   // this.spinnerDialog.show();
    // this.spinnerDialog.show(null, 'Please wait...');
    const companyId = localStorage.getItem('companyId');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    this.service.login(companyId, username, password).subscribe(() => {
      if (this.service.isUserAuthenticated() /*&& localStorage.getItem('rememberMe')*/) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.service.redirectUrl ? this.service.redirectUrl : '/home';
        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    },
      (error) => {
      /*  this.translate.get(['app.common.error', 'app.common.errorMessage']).subscribe(res => {
          this.messageService.add({
            severity: res['app.common.error'],
            summary: res['app.common.errorMessage'],
            detail: error.error.message});
        });*/
      }
    );
    // this.spinnerDialog.hide();
  }


  async login() {
    //this.loading.present();
    const companyId = this.authForm.get('company').value;
    const username = this.authForm.get('username').value;
    const password = this.authForm.get('password').value;
    this.service.login(companyId, username, password).subscribe(() => {
      if (this.service.isUserAuthenticated() /*&& localStorage.getItem('rememberMe')*/) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.service.redirectUrl ? this.service.redirectUrl : '/home';
        localStorage.setItem('keepMeLogin', this.authForm.get('keepMeLogin').value);

        if(this.authForm.get('keepMeLogin').value){
          localStorage.setItem('companyId', companyId);
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        }

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      } else {
        this.errorMsg = this.service.getErrorMsg();
        this.displayErrorMsg();
      }
    },
      (error)=>{
      /*  this.translate.get(['app.common.error', 'app.common.errorMessage']).subscribe(res => {
          this.messageService.add({
            severity: res['app.common.error'],
            summary: res['app.common.errorMessage'],
            detail: error.error.message});
        });*/
      }
    );
  }

  async displayErrorMsg() {
    const toast = await this.toastController.create({
      message: this.errorMsg,
      cssClass: 'error',
      duration: 5000
    });
    toast.present();
  }


}