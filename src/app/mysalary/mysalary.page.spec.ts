import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysalaryPage } from './mysalary.page';

describe('MysalaryPage', () => {
  let component: MysalaryPage;
  let fixture: ComponentFixture<MysalaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysalaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
