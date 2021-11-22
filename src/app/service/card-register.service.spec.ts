import { TestBed } from '@angular/core/testing';

import { CardRegisterService } from './card-register.service';

describe('CardRegisterService', () => {
  let service: CardRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
