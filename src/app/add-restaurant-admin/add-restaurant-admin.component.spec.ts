import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantAdminComponent } from './add-restaurant-admin.component';

describe('AddRestaurantAdminComponent', () => {
  let component: AddRestaurantAdminComponent;
  let fixture: ComponentFixture<AddRestaurantAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
