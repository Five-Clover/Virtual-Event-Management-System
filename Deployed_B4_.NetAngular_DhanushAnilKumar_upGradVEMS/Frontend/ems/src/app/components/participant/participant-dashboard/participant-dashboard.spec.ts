import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantDashboard } from './participant-dashboard';

describe('ParticipantDashboard', () => {
  let component: ParticipantDashboard;
  let fixture: ComponentFixture<ParticipantDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
