import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishListComponent } from './add-dish-list.component';

describe('AddDishListComponent', () => {
  let component: AddDishListComponent;
  let fixture: ComponentFixture<AddDishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDishListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
