import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtimetableComponent } from './addtimetable.component';

describe('AddtimetableComponent', () => {
  let component: AddtimetableComponent;
  let fixture: ComponentFixture<AddtimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
