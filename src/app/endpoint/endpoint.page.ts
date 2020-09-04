import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EndpointService } from './endpoint.service';
import { AlertService } from 'src/common/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.page.html',
  styleUrls: ['./endpoint.page.scss'],
})
export class EndpointPage implements OnInit {
  requestForm: FormGroup;
  title = 'app.endpoint.title';
  constructor(public formBuilder: FormBuilder,    private router: Router,
    private service: EndpointService, private alertService: AlertService) { 
      this.requestForm = formBuilder.group({
        CompanyKey: new FormControl('', [Validators.required])
      });
    }

  ngOnInit() {
  }

  submit() {
    this.service.getEndpoint(this.requestForm.get('CompanyKey').value).then(res => {
      if(res.Success == true){
        localStorage.setItem('API_ENDPOINT', res.Item);
        this.router.navigate(['/login']);
      } else {
        this.alertService.displayErrorToast(res.Message);
      }
    });

  }


}
