import { TestBed } from '@angular/core/testing';

import { BillsFilterService } from './bills-filter.service';

describe('BillsFilterService', () => {
  let service: BillsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
