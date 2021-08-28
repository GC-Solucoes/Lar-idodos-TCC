
import { first } from 'rxjs/operators';
import { PostagemService } from './postagem.service';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Postagem } from './postagem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.scss']
})
export class PostagemComponent implements OnInit {

  postagens: Postagem[];
  postagem: any


  router: Router;
  submitted = false; // submisions status
  constructor(
    private route: ActivatedRoute, private postagemService: PostagemService,

  ) { }

  ngOnInit(): void {

    this.postagemService
      .getAll()
      .pipe(first())
      .subscribe((postagem) => {
        this.postagens = postagem
      });



  }


  delete(id: number) {
    this.postagemService.delete(id)
      .subscribe(
        data => {
          this.submitted = true;
          this.ngOnInit()
        }
      )


  }

}
