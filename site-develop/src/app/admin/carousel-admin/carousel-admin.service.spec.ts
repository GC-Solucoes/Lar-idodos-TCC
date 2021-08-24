import { TestBed } from '@angular/core/testing';

import { CarouselAdminService } from './carousel-admin.service';

describe('CarouselAdminService', () => {
  let service: CarouselAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
