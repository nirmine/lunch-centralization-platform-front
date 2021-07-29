import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuperComponent } from './dashboard-super.component';

describe('DashboardSuperComponent', () => {
  let component: DashboardSuperComponent;
  let fixture: ComponentFixture<DashboardSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSuperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
