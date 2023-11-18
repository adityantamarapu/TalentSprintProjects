import { TestBed } from '@angular/core/testing';

import { PointsDataService } from './points-data.service';

describe('PointsDataService', () => {
  let service: PointsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
