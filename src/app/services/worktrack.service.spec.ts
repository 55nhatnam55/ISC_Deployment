import { TestBed } from '@angular/core/testing';

import { WorktrackService } from './worktrack.service';

describe('WorktrackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorktrackService = TestBed.get(WorktrackService);
    expect(service).toBeTruthy();
  });
});
