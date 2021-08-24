import { TestBed } from '@angular/core/testing';

import { PoliticasDePrivacidadeService } from './politicas-de-privacidade.service';

describe('PoliticasDePrivacidadeService', () => {
  let service: PoliticasDePrivacidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticasDePrivacidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
