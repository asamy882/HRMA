import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRequestTypePage } from './choose-request-type.page';

describe('ChooseRequestTypePage', () => {
  let component: ChooseRequestTypePage;
  let fixture: ComponentFixture<ChooseRequestTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRequestTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRequestTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
