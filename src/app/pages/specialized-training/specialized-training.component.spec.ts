import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedTrainingComponent } from './specialized-training.component';

describe('SpecializedTrainingComponent', () => {
  let component: SpecializedTrainingComponent;
  let fixture: ComponentFixture<SpecializedTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializedTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
