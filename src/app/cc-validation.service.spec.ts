import { TestBed } from '@angular/core/testing';

import { CcValidationService } from './cc-validation.service';

describe('CcValidationService', () => {
  let service: CcValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
