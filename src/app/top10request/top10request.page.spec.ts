import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10requestPage } from './top10request.page';

describe('Top10requestPage', () => {
  let component: Top10requestPage;
  let fixture: ComponentFixture<Top10requestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10requestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10requestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
