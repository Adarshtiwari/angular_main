import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivatechildGuard } from './can-activatechild.guard';

describe('canActivatechildGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActivatechildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
