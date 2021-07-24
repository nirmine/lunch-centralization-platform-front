import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOrderProxymianComponent } from './validate-order-proxymian.component';

describe('ValidateOrderProxymianComponent', () => {
  let component: ValidateOrderProxymianComponent;
  let fixture: ComponentFixture<ValidateOrderProxymianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateOrderProxymianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateOrderProxymianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
