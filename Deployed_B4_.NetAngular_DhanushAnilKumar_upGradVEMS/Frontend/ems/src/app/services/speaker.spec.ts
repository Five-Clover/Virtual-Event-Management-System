import { TestBed } from '@angular/core/testing';

import { Speaker } from './speaker';

describe('Speaker', () => {
  let service: Speaker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Speaker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
