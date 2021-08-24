import { DomSanitizer } from '@angular/platform-browser';
import { OndeEstamos } from './../../admin/onde-estamos-admin/interface onde-estamos/onde-estamos';
import { first } from 'rxjs/operators';
import { OndeEstamosService } from './../../admin/onde-estamos-admin/onde-estamos.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-onde-estamos',
  templateUrl: './onde-estamos.component.html',
  styleUrls: ['./onde-estamos.component.scss'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None,
})





export class OndeEstamosComponent implements OnInit {

  ondeEstamos: OndeEstamos[];
  OndeEstamos: any;
  submitted = false; // submisions status



  constructor(private config: NgbCarouselConfig, private OndeEstamosService:OndeEstamosService,  private sanitizer: DomSanitizer    ) {
    config.interval = 10000;
    config.pauseOnHover = true;
    config.showNavigationArrows = true;
   }

  ngOnInit(): void {
   this.OndeEstamosService
   .getAll()
   .pipe(first())
   .subscribe((OndeEstamos) => {
    // OndeEstamos.forEach(element => {
      let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:4200/assets/uploads/tc2codecard.jpeg`, )
    //   // element.ondeEstamosImagem = sanitizedUrl;

    // });
    this.ondeEstamos = OndeEstamos
   });

  }

}
