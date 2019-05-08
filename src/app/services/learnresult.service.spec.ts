import { TestBed } from '@angular/core/testing';

import { LearnresultService } from './learnresult.service';

describe('LearnresultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearnresultService = TestBed.get(LearnresultService);
    expect(service).toBeTruthy();
  });
});
