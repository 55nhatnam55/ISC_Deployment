import { TestBed } from '@angular/core/testing';

import { ExaminationsubjectService } from './examinationsubject.service';

describe('ExaminationsubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExaminationsubjectService = TestBed.get(ExaminationsubjectService);
    expect(service).toBeTruthy();
  });
});
