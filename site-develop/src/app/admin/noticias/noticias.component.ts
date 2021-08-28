import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostagemService } from '../postagem/postagem.service';
import { Postagem } from '../postagem/postagem'
import { Banner } from './../banner/interfaces-banner/banner';
import { BannerService } from './../banner/banner.service';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  postagens: Postagem[];
  postagem: any
  banners: Banner[];
  banner: any
  constructor(
    private postagemService: PostagemService,
    private bannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.postagemService
      .getAll()
      .pipe(first())
      .subscribe((postagem) => {
        this.postagens = postagem
      });

    this.bannerService
      .getAll()
      .pipe(first())
      .subscribe((banner) => {
        this.banners = banner
      });
  }

}
