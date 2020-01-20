import { TestBed } from '@angular/core/testing';

import { BustripService } from './bustrip.service';

describe('BustripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BustripService = TestBed.get(BustripService);
    expect(service).toBeTruthy();
  });
});
