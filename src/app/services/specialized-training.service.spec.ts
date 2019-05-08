import { TestBed } from '@angular/core/testing';

import { SpecializedTrainingService } from './specialized-training.service';

describe('SpecializedTrainingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecializedTrainingService = TestBed.get(SpecializedTrainingService);
    expect(service).toBeTruthy();
  });
});
