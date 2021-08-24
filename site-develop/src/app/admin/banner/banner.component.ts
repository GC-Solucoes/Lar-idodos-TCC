import { Banner } from './interfaces-banner/banner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BannerService} from './banner.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  banners: Banner[];
  banner: any;
  submitted = false; // submisions status


  constructor(
    private route: ActivatedRoute,  private BannerService: BannerService
  ) { }

  ngOnInit(): void {

    this.BannerService
    .getAll()
    .pipe(first())
    .subscribe((banner) => {
      this.banners = banner
    });


  }


  delete(id:number) {
    this.BannerService.delete(id)
    .subscribe(
      data => {
    this.submitted = true;
    this.ngOnInit()
      }
    )


    }




}

