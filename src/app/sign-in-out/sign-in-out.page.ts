import { Component, OnInit } from '@angular/core';
import { SignInOutService } from './sign-in-out.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';


@Component({
  selector: 'app-sign-in-out',
  templateUrl: './sign-in-out.page.html',
  styleUrls: ['./sign-in-out.page.scss'],
})
export class SignInOutPage implements OnInit {
  requestForm: FormGroup;
  signInSuccessMsg: string;
  signOutSuccessMsg: string;
  lat: number;
  lng: number;
  branchs: any[];
  renderSaveButton: boolean = true;
  disabledSaveButton: boolean = true;
  backPage = '/home';
  title = 'app.SignInOut.title';
  uuid: string;

  constructor(
    public formBuilder: FormBuilder,
    private service: SignInOutService,
    private toastController: ToastController,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private geolocation: Geolocation,
    private uniqueDeviceID: UniqueDeviceID
  ) {
    this.uniqueDeviceID.get()
  .then((uuid: any) => this.uuid = uuid)
  .catch((error: any) => console.log(error));
    this.requestForm = formBuilder.group({
      LocationId: new FormControl('', [Validators.required]),
      Direction: new FormControl('', [Validators.required])
    });
  }

  
  ngOnInit() {    
    this.loadOutsideLocations();
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.SignInOut.signInSuccessMsg', 'app.SignInOut.signOutSuccessMsg']).subscribe(res => {
      this.signInSuccessMsg = res['app.SignInOut.signInSuccessMsg'];
      this.signOutSuccessMsg = res['app.SignInOut.signOutSuccessMsg'];
    });    
  }

  async loadOutsideLocations() {
    this.service.getOutsideLocations().then((res) => {
      this.branchs = res.Items;
    });
  }

  getLoc(){
    this.disabledSaveButton = true;
    this.geolocation.getCurrentPosition(
      {maximumAge: 1000, timeout: 5000,
       enableHighAccuracy: true }
      ).then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            //alert("r succ"+resp.coords.latitude)
           // alert(JSON.stringify( resp.coords));
      
            this.lat=resp.coords.latitude;
            this.lng=resp.coords.longitude;
            this.disabledSaveButton = false;
            },er=>{
              //alert("error getting location")
              console.log('Can not retrieve Location')
            }).catch((error) => {
            //alert('Error getting location'+JSON.stringify(error));
               console.log('Error getting location - '+JSON.stringify(error))
            });
  }
  

  
  submit() {
    (<any>window).plugins.mockgpschecker.check((a) => this.successCallback(a), (b) => this.errorCallback(b));
  }

  async displayMsg(msg, cal) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: cal,
      duration: 5000
    });
    toast.present();
  }

  


  successCallback(result) {
    if(result.isMock == false){
      if(!this.lat){
        this.displayMsg('You should press get my location first','error');
        return false;
      }
      const request = {
          LocationId: this.requestForm.get('LocationId').value,
          Direction: this.requestForm.get('Direction').value,
          DeviceId: this.uuid,
          CheckinLocation: this.lat + ',' + this.lng
         };
       //  alert(JSON.stringify(request));
      this.service.addLocationAttendance(request).then(res => {
        this.renderSaveButton = false;
        if(this.requestForm.get('Direction').value == '1' || this.requestForm.get('Direction').value == 1){
          this.displayMsg(this.signInSuccessMsg,'success');
        } else {
          this.displayMsg(this.signOutSuccessMsg,'success');
        }
      });
  
    } else {
      this.displayMsg('Plaese disable fake location app','error');
      return false;
    }
  }

  errorCallback(error) {
    console.log(error);
    this.displayMsg(error,'error');
    return false;

  }


}