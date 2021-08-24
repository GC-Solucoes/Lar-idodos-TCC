import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { PoliticasDePrivacidadeService } from './../../../admin/politicas-de-privacidade/politicas-de-privacidade.service';
import { PoliticaDePrivacidade } from './../../../admin/politicas-de-privacidade/interface-politica-de-privacidade/politica-de-privacidade';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.scss']
})
export class PoliticaPrivacidadeComponent implements OnInit {
  closeResult = '';
  PoliticaDePrivacidade: PoliticaDePrivacidade[];
  politicaPrivacidade: any
  submitted = false;

  constructor(private modalService: NgbModal,
     private politicaDePrivacidadeService :PoliticasDePrivacidadeService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.politicaDePrivacidadeService
    .getAll()
    .pipe(first())
    .subscribe((politicaPrivacidade: PoliticaDePrivacidade[]) => {
      this.PoliticaDePrivacidade = politicaPrivacidade;
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
