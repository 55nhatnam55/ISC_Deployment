import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestresultComponent } from './testresult.component';

describe('TestresultComponent', () => {
  let component: TestresultComponent;
  let fixture: ComponentFixture<TestresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
