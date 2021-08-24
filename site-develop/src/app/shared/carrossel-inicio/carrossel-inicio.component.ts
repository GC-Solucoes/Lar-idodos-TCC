import { CarouselAdminService } from './../../admin/carousel-admin/carousel-admin.service';
import { Carousel } from './../../admin/carousel-admin/interface-carousel-admin/carousel';
import { Component, OnInit } from '@angular/core';
// import { }
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carrossel-inicio',
  templateUrl: './carrossel-inicio.component.html',
  styleUrls: ['./carrossel-inicio.component.scss']
})
export class CarrosselInicioComponent implements OnInit {
  Carousels: Carousel[];
  carousel: any;
  submitted = false


  private readonly API = `${environment.apiUrl}/tmp/uploadsCarousel`;

  imagens:any[]=[

     {
      name:'Banner',
    // img:`${}`,
    // desc:`${}`
  },
  {
    name:'Banner',
    img:'assets/images/teste1.jpg',
    desc:'Teste'
  },
  {
    name:'Banner',
    img:'assets/images/teste3.jpg',
    desc:'Teste'
  },
]


  constructor(private _config:NgbCarouselConfig,
    private sanitizer: DomSanitizer,
    private CarouselAdminService: CarouselAdminService
    ) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = true;
   }

  ngOnInit(): void {
    this.CarouselAdminService
    .getAll()
    .pipe(first())
    .subscribe((carousel) => {
    carousel.forEach(element => {
      //  element.carouselImagens = `file:///C:\\Users\\Gabriel%20Coimbra\\Documents\\api\\tmp\\uploadsCarousel\\${element.carouselImagens}`
      let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:4200/assets/uploads/tc2codecard.jpeg`, )
      // let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl('')
      element.carouselImagens = sanitizedUrl;

    });
       this.Carousels = carousel


    });
  }







}
