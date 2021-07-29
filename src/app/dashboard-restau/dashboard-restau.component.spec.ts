import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRestauComponent } from './dashboard-restau.component';

describe('DashboardRestauComponent', () => {
  let component: DashboardRestauComponent;
  let fixture: ComponentFixture<DashboardRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRestauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
