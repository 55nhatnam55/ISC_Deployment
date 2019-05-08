import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrancetestComponent } from './entrancetest.component';

describe('EntrancetestComponent', () => {
  let component: EntrancetestComponent;
  let fixture: ComponentFixture<EntrancetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrancetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrancetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
