import { TestBed } from '@angular/core/testing';

import { LecturersService } from './lecturers.service';

describe('LecturersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecturersService = TestBed.get(LecturersService);
    expect(service).toBeTruthy();
  });
});
