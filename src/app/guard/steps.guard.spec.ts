import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { stepsGuard } from './steps.guard';

describe('stepsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
