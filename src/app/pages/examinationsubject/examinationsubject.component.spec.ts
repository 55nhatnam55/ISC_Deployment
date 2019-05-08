import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationsubjectComponent } from './examinationsubject.component';

describe('ExaminationsubjectComponent', () => {
  let component: ExaminationsubjectComponent;
  let fixture: ComponentFixture<ExaminationsubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationsubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
