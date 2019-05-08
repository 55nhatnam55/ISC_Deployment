import { TestBed } from '@angular/core/testing';

import { MajorService } from './major.service';

describe('MajorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MajorService = TestBed.get(MajorService);
    expect(service).toBeTruthy();
  });
});
