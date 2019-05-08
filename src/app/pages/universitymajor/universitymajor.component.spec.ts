import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitymajorComponent } from './universitymajor.component';

describe('UniversitymajorComponent', () => {
  let component: UniversitymajorComponent;
  let fixture: ComponentFixture<UniversitymajorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitymajorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitymajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
