import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestauInfosComponent } from './edit-restau-infos.component';

describe('EditRestauInfosComponent', () => {
  let component: EditRestauInfosComponent;
  let fixture: ComponentFixture<EditRestauInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRestauInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestauInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
