import { Component, OnInit } from '@angular/core';
import { MissionSignInOutService } from './mission-sign-in-out.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/common/services/language.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { UUID } from 'angular2-uuid';
import { NavigationExtras, Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-mission-sign-in-out',
  templateUrl: './mission-sign-in-out.page.html',
  styleUrls: ['./mission-sign-in-out.page.scss'],
})
export class MissionSignInOutPage implements OnInit {
  requestForm: FormGroup;
  signInSuccessMsg: string;
  signOutSuccessMsg: string;
  lat: number;
  lng: number;
  branchs: any[];
  missions: any[];
  selectedMission: any = {};
  renderSaveButton: boolean = true;
  disabledSaveButton: boolean = true;
  backPage = '/home';
  title = 'app.MissionSignInOut.title';
  uuid: string;

  constructor(
    public formBuilder: FormBuilder,
    private service: MissionSignInOutService,
    private toastController: ToastController,
    private languageService: LanguageService,
    private readonly translate: TranslateService,
    private geolocation: Geolocation,
    private router: Router,
    private uniqueDeviceID: UniqueDeviceID,
    public platform: Platform
  ) {
    this.uniqueDeviceID.get()
  .then((uuid: any) => this.uuid = uuid)
  .catch((error: any) => console.log(error));
    this.requestForm = formBuilder.group({
      LocationId: new FormControl('', [Validators.required]),
      MissionId: new FormControl('', [Validators.required]),
      Direction: new FormControl('', [Validators.required])
    });
  }

  
  ngOnInit() {    
    this.loadMyMissionRequestsForAttendance();
    this.translate.use(this.languageService.currentLang);
    this.translate.get(['app.SignInOut.signInSuccessMsg', 'app.SignInOut.signOutSuccessMsg']).subscribe(res => {
      this.signInSuccessMsg = res['app.SignInOut.signInSuccessMsg'];
      this.signOutSuccessMsg = res['app.SignInOut.signOutSuccessMsg'];
    });    
  }

  async loadMyMissionRequestsForAttendance() {
    this.service.getMyMissionRequestsForAttendance().then((res) => {
      this.missions = res.Items;
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
            // alert(JSON.stringify(resp.coords));
      
            this.lat=resp.coords.latitude;
            this.lng=resp.coords.longitude;
            this.disabledSaveButton = false;
            },er=>{
              //alert("error getting location")
              console.log('Can not retrieve Location');
            }).catch((error) => {
            //alert('Error getting location'+JSON.stringify(error));
               console.log('Error getting location - '+JSON.stringify(error))
            });
  }
  

  
  submit() {
    this.renderSaveButton = false;
    //alert('submit');
    //alert(this.platform.is('ios'));
    //alert(this.platform.is('android'));
    this.process();
    if(this.platform.is('ios')){
      this.process();
    } else {
    //  (<any>window).plugins.mockgpschecker.check((a) => this.successCallback(a), (b) => this.errorCallback(b));
    }
    
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
      this.process();  
    } else {
      this.renderSaveButton = true;
      this.displayMsg('Plaese disable fake location app','error');
      return false;
    }
  }

  process(){
    this.lat = 29.624478;
    this.lng = 31.255412;
    if(!this.lat){
      this.renderSaveButton = true;
      this.displayMsg('You should press get my location first','error');
      return false;
    }
    const request = {
        MissionRequestId: this.requestForm.get('MissionId').value,
        LocationId: this.requestForm.get('LocationId').value,
        Direction: this.requestForm.get('Direction').value,
        DeviceId: this.getDeviceId(),
        CheckinLocation: this.lat + ',' + this.lng
       };
      // alert(JSON.stringify(request));
    this.service.addLocationAttendance(request).then(res => {        if(this.requestForm.get('Direction').value == '1' || this.requestForm.get('Direction').value == 1){
        this.displayMsg(this.signInSuccessMsg,'success');
        this.navigateToHome();
      } else {
        this.displayMsg(this.signOutSuccessMsg,'success');
        this.navigateToHome();
      }
    },
    error => {
      this.renderSaveButton = true;
    });
  }

  getDeviceId(){
    if(this.uuid){
      return this.uuid
    } else {
      if(localStorage.getItem('deviceId') && localStorage.getItem('deviceId') != null){
        this.uuid = localStorage.getItem('deviceId');
        return this.uuid
      } else {
        this.uuid = UUID.UUID();
        localStorage.setItem('deviceId', this.uuid);
        return this.uuid
      }
    }  
  }

  errorCallback(error) {
    console.log(error);
    this.renderSaveButton = true;
    this.displayMsg(error,'error');
    return false;

  }

  changeMission(){
    this.selectedMission = this.missions.filter(m => m.RequestId == this.requestForm.get('MissionId').value)[0];
    if(this.selectedMission.Locations && this.selectedMission.Locations.length > 0){
      this.requestForm.controls['LocationId'].setValidators(Validators.required);
      this.requestForm.controls['LocationId'].enable();
    } else {
      this.requestForm.controls['LocationId'].clearValidators();
      this.requestForm.controls['LocationId'].disable();
    }
  }

  navigateToHome() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      queryParams: null
    };
    this.router.navigate([this.backPage], navigationExtras);
  }


}