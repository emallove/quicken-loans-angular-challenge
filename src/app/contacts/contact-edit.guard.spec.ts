import { TestBed, async, inject } from '@angular/core/testing';

import { ContactEditGuard } from './contact-edit.guard';

describe('ContactEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactEditGuard]
    });
  });

  it('should ...', inject([ContactEditGuard], (guard: ContactEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
