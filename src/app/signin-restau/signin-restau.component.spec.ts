import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninRestauComponent } from './signin-restau.component';

describe('SigninRestauComponent', () => {
  let component: SigninRestauComponent;
  let fixture: ComponentFixture<SigninRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninRestauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
