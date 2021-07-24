import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminSuperComponent } from './add-admin-super.component';

describe('AddAdminSuperComponent', () => {
  let component: AddAdminSuperComponent;
  let fixture: ComponentFixture<AddAdminSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminSuperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
