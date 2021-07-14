import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OndeEstamosAdminComponent } from './onde-estamos-admin.component';

describe('OndeEstamosAdminComponent', () => {
  let component: OndeEstamosAdminComponent;
  let fixture: ComponentFixture<OndeEstamosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OndeEstamosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OndeEstamosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
