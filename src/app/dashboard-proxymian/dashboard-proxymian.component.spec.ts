import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProxymianComponent } from './dashboard-proxymian.component';

describe('DashboardProxymianComponent', () => {
  let component: DashboardProxymianComponent;
  let fixture: ComponentFixture<DashboardProxymianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProxymianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProxymianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
