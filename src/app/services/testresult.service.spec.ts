import { TestBed } from '@angular/core/testing';

import { TestresultService } from './testresult.service';

describe('TestresultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestresultService = TestBed.get(TestresultService);
    expect(service).toBeTruthy();
  });
});
