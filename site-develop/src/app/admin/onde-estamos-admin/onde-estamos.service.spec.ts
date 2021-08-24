import { TestBed } from '@angular/core/testing';

import { OndeEstamosService } from './onde-estamos.service';

describe('OndeEstamosService', () => {
  let service: OndeEstamosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OndeEstamosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
