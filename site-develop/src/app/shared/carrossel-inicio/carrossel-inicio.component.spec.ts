import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselInicioComponent } from './carrossel-inicio.component';

describe('CarrosselInicioComponent', () => {
  let component: CarrosselInicioComponent;
  let fixture: ComponentFixture<CarrosselInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrosselInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosselInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
