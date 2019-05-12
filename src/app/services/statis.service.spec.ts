import { TestBed } from '@angular/core/testing';

import { StatisService } from './statis.service';

describe('StatisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisService = TestBed.get(StatisService);
    expect(service).toBeTruthy();
  });
});
