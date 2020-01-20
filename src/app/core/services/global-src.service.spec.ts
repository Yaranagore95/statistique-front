import { TestBed } from '@angular/core/testing';

import { GlobalSrcService } from './global-src.service';

describe('GlobalSrcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalSrcService = TestBed.get(GlobalSrcService);
    expect(service).toBeTruthy();
  });
});
