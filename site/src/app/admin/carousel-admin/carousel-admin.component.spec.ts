import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAdminComponent } from './carousel-admin.component';

describe('CarouselAdminComponent', () => {
  let component: CarouselAdminComponent;
  let fixture: ComponentFixture<CarouselAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
