import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdetailsPage } from './taskdetails.page';

describe('TaskdetailsPage', () => {
  let component: TaskdetailsPage;
  let fixture: ComponentFixture<TaskdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
