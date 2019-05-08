import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktrackComponent } from './worktrack.component';

describe('WorktrackComponent', () => {
  let component: WorktrackComponent;
  let fixture: ComponentFixture<WorktrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorktrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorktrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
