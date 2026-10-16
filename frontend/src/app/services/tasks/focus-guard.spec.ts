import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { focusGuard } from './focus-guard';

describe('focusGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => focusGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
