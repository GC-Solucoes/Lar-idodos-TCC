import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCarouselAdminComponent } from './editar-carousel-admin.component';

describe('EditarCarouselAdminComponent', () => {
  let component: EditarCarouselAdminComponent;
  let fixture: ComponentFixture<EditarCarouselAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCarouselAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCarouselAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
