import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EndpointService } from './endpoint.service';
import { AlertService } from 'src/common/services/alert.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/common/services/loading.service';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.page.html',
  styleUrls: ['./endpoint.page.scss'],
})
export class EndpointPage implements OnInit {
  requestForm: FormGroup;
  title = 'app.endpoint.title';
  constructor(public formBuilder: FormBuilder,    private router: Router, public loadingService: LoadingService,
    private service: EndpointService, private alertService: AlertService) { 
      this.requestForm = formBuilder.group({
        CompanyKey: new FormControl('', [Validators.required])
      });
    }

  ngOnInit() {
  }

  submit() {
    this.loadingService.present().catch((res) => {});
    this.service.getEndpoint(this.requestForm.get('CompanyKey').value).then(res => {
      if(res.Success == true){
        localStorage.setItem('API_ENDPOINT', res.Item);
        this.loadingService.dismiss().catch((res) => {});
        alert('You have registered successfully');
        this.router.navigate(['/login']);
      } else {
        this.loadingService.dismiss().catch((res) => {});
        this.alertService.displayErrorToast(res.Message);
      }
    });

  }


}
