import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostagemService } from '../postagem/postagem.service';
import { Postagem } from '../postagem/postagem'

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  postagens: Postagem[];
  postagem: any

  constructor(
    private postagemService: PostagemService
  ) { }

  ngOnInit(): void {
    this.postagemService
      .getAll()
      .pipe(first())
      .subscribe((postagem) => {
        this.postagens = postagem
      });
  }

}
