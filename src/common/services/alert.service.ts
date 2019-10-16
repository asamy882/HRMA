import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertCtrl: AlertController, private translateService: TranslateService,
              private toastCtrl: ToastController, private language: LanguageService) {
  }

  async displayErrorToast(msg) {
    console.log('displayErrorToast', msg);
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'errorToastClass',
      duration: 500000
    });
    toast.present();
  }

  async displaySuccessToast(msg) {
    console.log('displaySuccessToast', msg);
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'success',
      duration: 5000
    });
    toast.present();
  }

  async displaySuccessMessage() {
    this.translateService.get(["common.successMessage"]).subscribe(
      res => {
        this.displaySuccessToast(res['common.successMessage']);
      });
  }


  async displayInfoToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      cssClass: 'info',
      duration: 5000
    });
    toast.present();
  }

  async displayErrorToast1(msg, isLogout = false) {
    const div = document.getElementById("tempForHTML");
    div.innerHTML = msg;
    const toast = await this.toastCtrl.create({
      message: div.innerText,
      position: 'top',
      showCloseButton: true,
      closeButtonText: "Close",
      cssClass: "errorToastClass"
      // dismissOnPageChange: true
    });
    toast.present();
  }
}