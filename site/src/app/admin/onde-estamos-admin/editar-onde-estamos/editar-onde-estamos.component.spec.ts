import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOndeEstamosComponent } from './editar-onde-estamos.component';

describe('EditarOndeEstamosComponent', () => {
  let component: EditarOndeEstamosComponent;
  let fixture: ComponentFixture<EditarOndeEstamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarOndeEstamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOndeEstamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
