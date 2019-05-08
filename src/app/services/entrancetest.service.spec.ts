import { TestBed } from '@angular/core/testing';

import { EntranceTestService } from './entrancetest.service';

describe('EntrancetestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntranceTestService = TestBed.get(EntranceTestService);
    expect(service).toBeTruthy();
  });
});
