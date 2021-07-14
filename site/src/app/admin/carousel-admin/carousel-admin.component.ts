import { ActivatedRoute } from '@angular/router';
import { CarouselAdminService } from './carousel-admin.service';
import { Carousel } from './interface-carousel-admin/carousel';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel-admin',
  templateUrl: './carousel-admin.component.html',
  styleUrls: ['./carousel-admin.component.scss']
})
export class CarouselAdminComponent implements OnInit {

  Carousels: Carousel[];
  carousel: any;
  submitted = false


  constructor(private route: ActivatedRoute,  private CarouselAdminService: CarouselAdminService) { }


  ngOnInit(): void {

    this.CarouselAdminService
    .getAll()
    .pipe(first())
    .subscribe((carousel) => {
      this.Carousels = carousel
    });
  }



  delete(id:number) {
    this.CarouselAdminService.delete(id)
    .subscribe(
      data => {
    this.submitted = true;
    this.ngOnInit()
      }
    )

}


}
