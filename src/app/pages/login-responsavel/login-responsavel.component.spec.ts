import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginResponsavelComponent } from './login-responsavel.component';

describe('LoginResponsavelComponent', () => {
  let component: LoginResponsavelComponent;
  let fixture: ComponentFixture<LoginResponsavelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginResponsavelComponent]
    });
    fixture = TestBed.createComponent(LoginResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
