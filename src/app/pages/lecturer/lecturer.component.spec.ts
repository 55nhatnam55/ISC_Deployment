import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerComponent } from './lecturer.component';

describe('LecturerComponent', () => {
  let component: LecturerComponent;
  let fixture: ComponentFixture<LecturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
