import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerForm } from './speaker-form';

describe('SpeakerForm', () => {
  let component: SpeakerForm;
  let fixture: ComponentFixture<SpeakerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
