import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveFeedbackProxymianComponent } from './give-feedback-proxymian.component';

describe('GiveFeedbackProxymianComponent', () => {
  let component: GiveFeedbackProxymianComponent;
  let fixture: ComponentFixture<GiveFeedbackProxymianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveFeedbackProxymianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveFeedbackProxymianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
