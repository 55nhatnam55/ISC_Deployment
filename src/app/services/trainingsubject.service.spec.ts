import { TestBed } from '@angular/core/testing';

import { TrainingsubjectService } from './trainingsubject.service';

describe('TrainingsubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingsubjectService = TestBed.get(TrainingsubjectService);
    expect(service).toBeTruthy();
  });
});
