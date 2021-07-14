import { TestBed } from '@angular/core/testing';

import { AlterarImagensService } from './alterar-imagens.service';

describe('AlterarImagensService', () => {
  let service: AlterarImagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlterarImagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
