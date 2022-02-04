import { TestBed } from '@angular/core/testing';

import { TrainerAuthGuard } from './trainer-auth.guard';

describe('TrainerAuthGuard', () => {
  let guard: TrainerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrainerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
