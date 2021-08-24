import { first } from 'rxjs/operators';

import { PostagemService } from '../postagem.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Postagem} from '../postagem';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-postagem',
  templateUrl: './editar-postagem.component.html',
  styleUrls: ['./editar-postagem.component.scss']
})
export class EditarPostagemComponent implements OnInit {
  postagemForm: FormGroup;
  postagem = new Postagem();
  submitted = false;
  formInvalid = false;
  routeSub: any;
  errorMessage = '';
  sendSuccess = false;


  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(): void {
    this.postagemForm = this.formBuilder.group({
      titulo: ['',[Validators.required,Validators.minLength(5)]],
      textos: ['', [Validators.required,Validators.minLength(5)]],
      links: ['', [Validators.required,Validators.minLength(5)]],

    });

    this.routeSub = this.route.params.subscribe((params) => {
      var id: number = params['id'];

      if (id) {
          this.postagemService
              .getById(id)
              .pipe()
              .subscribe((postagem) => {
                  this.postagem = postagem;
              });
      }
      // console.log(id)
  });





  }

  // get f() { return this.postagemForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.postagem.id > 0) {

      if(this.postagemForm.valid) {
        this.postagemService.put(this.postagem, this.postagem.id).subscribe(
            (response) => {
                console.log('Postagem atualizada com sucesso.');
                alert("Postagem atualizada com sucesso.");
                this.router.navigate(['/admin']);
            },
            (error) => {
               console.log(
                    'Não foi possível atualizar a postagem.'
                );
            }
        );
      } else {
        console.log('Formulário Inválido');
        alert('Existe erros, verifique os dados preenchidos')
        this.verificaValidacoesForm(this.postagemForm);
            }



      } else {
        if(this.postagemForm.valid) {
        this.postagemService.post(this.postagem).subscribe(
            (response) => {
              console.log('Postagem criada com sucesso.');
              alert("Postagem Criada com sucesso.");
              console.log(this.postagem.id);
                this.router.navigate(['/admin']);
            },
            (error) => {
              console.log(error);
            }
        );
    } else {
      console.log('Formulário Inválido')
      alert('Existe erros, verifique os dados preenchidos')
      this.verificaValidacoesForm(this.postagemForm);
    }

    }
  }


  verificaValidTouched(campo){

    return !this.postagemForm.get(campo).valid && (this.postagemForm.get(campo).touched || this.postagemForm.get(campo).dirty)
    }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
  if(controle instanceof FormGroup) {
  this.verificaValidacoesForm(controle);
  }

     });
  }


  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

 changeRoute() {
  if (this.router.url === '/postagem') {
      this.postagem.id = 0;
  } else {
      this.postagem.id = 1;
  }
}


}
