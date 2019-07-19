import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyattendancePage } from './myattendance.page';

describe('MyattendancePage', () => {
  let component: MyattendancePage;
  let fixture: ComponentFixture<MyattendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyattendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyattendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
