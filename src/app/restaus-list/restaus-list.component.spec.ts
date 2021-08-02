import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestausListComponent } from './restaus-list.component';

describe('RestausListComponent', () => {
  let component: RestausListComponent;
  let fixture: ComponentFixture<RestausListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestausListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestausListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
