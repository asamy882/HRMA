import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVacationRequestPage } from './new-vacation-request.page';

describe('NewVacationRequestPage', () => {
  let component: NewVacationRequestPage;
  let fixture: ComponentFixture<NewVacationRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVacationRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVacationRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
