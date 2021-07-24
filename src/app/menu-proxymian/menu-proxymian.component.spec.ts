import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProxymianComponent } from './menu-proxymian.component';

describe('MenuProxymianComponent', () => {
  let component: MenuProxymianComponent;
  let fixture: ComponentFixture<MenuProxymianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProxymianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProxymianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
