import { TestBed } from '@angular/core/testing';

import { AcademicService } from './academic.service';

describe('AcademicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcademicService = TestBed.get(AcademicService);
    expect(service).toBeTruthy();
  });
});
