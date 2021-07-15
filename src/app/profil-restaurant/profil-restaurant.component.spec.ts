import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRestaurantComponent } from './profil-restaurant.component';

describe('ProfilRestaurantComponent', () => {
  let component: ProfilRestaurantComponent;
  let fixture: ComponentFixture<ProfilRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
