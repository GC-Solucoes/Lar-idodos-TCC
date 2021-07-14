import { first } from 'rxjs/operators';
import { PoliticaDePrivacidade } from './interface-politica-de-privacidade/politica-de-privacidade';
import { PoliticasDePrivacidadeService } from './politicas-de-privacidade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-politicas-de-privacidade',
  templateUrl: './politicas-de-privacidade.component.html',
  styleUrls: ['./politicas-de-privacidade.component.scss']
})
export class PoliticasDePrivacidadeComponent implements OnInit {
  PoliticaDePrivacidade: PoliticaDePrivacidade[];
  politicaPrivacidade: any
router: Router;
submitted = false;
  constructor(
    private route: ActivatedRoute,
   private politicaDePrivacidadeService :PoliticasDePrivacidadeService
  ) { }

  ngOnInit(): void {

    this.politicaDePrivacidadeService
    .getAll()
    .pipe(first())
    .subscribe((politicaPrivacidade) => {
      this.PoliticaDePrivacidade = politicaPrivacidade
    });

  }

}
