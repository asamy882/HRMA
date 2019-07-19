import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinformationsPage } from './myinformations.page';

describe('MyinformationsPage', () => {
  let component: MyinformationsPage;
  let fixture: ComponentFixture<MyinformationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyinformationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinformationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
