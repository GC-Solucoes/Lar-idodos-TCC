import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPoliticasDePrivacidadeComponent } from './editar-politicas-de-privacidade.component';

describe('EditarPoliticasDePrivacidadeComponent', () => {
  let component: EditarPoliticasDePrivacidadeComponent;
  let fixture: ComponentFixture<EditarPoliticasDePrivacidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPoliticasDePrivacidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPoliticasDePrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
