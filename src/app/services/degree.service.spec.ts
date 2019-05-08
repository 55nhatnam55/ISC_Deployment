import { TestBed } from '@angular/core/testing';

import { DegreeService } from './degree.service';

describe('DegreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DegreeService = TestBed.get(DegreeService);
    expect(service).toBeTruthy();
  });
});
