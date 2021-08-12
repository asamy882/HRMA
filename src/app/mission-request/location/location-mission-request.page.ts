import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-mission-request',
  templateUrl: './location-mission-request.page.html',
  styleUrls: ['./location-mission-request.page.scss'],
})
export class LocationMissionRequestPage implements OnInit {
  requestForm: FormGroup;
  readonly = false;
  renderSaveButton: boolean;
  renderCloseButton: boolean;
  @Input() branchs: any[];

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    this.requestForm = formBuilder.group({
      LocationId: new FormControl('', [Validators.required]),
      Comments: new FormControl('', [])
    });
}

  ngOnInit() {
  }



  dismiss() {
    this.modalController.dismiss({
      'LocationId': this.requestForm.get('LocationId').value,
      'Comments': this.requestForm.get('Comments').value,
      'LocationName': this.requestForm.get('LocationId').value ? this.branchs.filter(b => b.ID == this.requestForm.get('LocationId').value)[0].Name : ""
    });  
  }



}
