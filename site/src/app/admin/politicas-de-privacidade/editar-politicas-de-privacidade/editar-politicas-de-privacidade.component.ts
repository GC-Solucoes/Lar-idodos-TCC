import { PoliticaDePrivacidade } from './../interface-politica-de-privacidade/politica-de-privacidade';
import { PoliticasDePrivacidadeService } from './../politicas-de-privacidade.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-politicas-de-privacidade',
  templateUrl: './editar-politicas-de-privacidade.component.html',
  styleUrls: ['./editar-politicas-de-privacidade.component.scss']
})
export class EditarPoliticasDePrivacidadeComponent implements OnInit {
  politicaDePrivacidadeForm: FormGroup;
  politicaPrivacidade = new PoliticaDePrivacidade();
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
    private politicasDePrivacidadeService: PoliticasDePrivacidadeService

  ) { }

  ngOnInit(): void {

    this.politicaDePrivacidadeForm = this.formBuilder.group({

      PoliticaPrivacidade: ['', [Validators.required,Validators.minLength(5)]],

    });
    this.routeSub = this.route.params.subscribe((params) => {
      var id: number = params['id'];


      if (id) {
        this.politicasDePrivacidadeService
            .getById(id)
            .pipe()
            .subscribe((politicaPrivacidade) => {
                this.politicaPrivacidade = politicaPrivacidade;
            });
    }

  });

  }



  onSubmit() {
    this.submitted = true;
    if (this.politicaPrivacidade.id > 0) {
    if(this.politicaDePrivacidadeForm.valid) {
      this.politicasDePrivacidadeService.put(this.politicaPrivacidade, this.politicaPrivacidade.id).subscribe(
          (response) => {
              console.log('Politicas de Privacidade atualizada com sucesso.');
              alert("Politicas de Privacidade atualizada com sucesso.");
              this.router.navigate(['/admin']);
          },
          (error) => {
             console.log(
                  'Não foi possível atualizar as Politicas de Privacidade.'
              );
          }
      );
    } else {
      console.log('Formulário Inválido');
      alert('Existe erros, verifique os dados preenchidos')
      this.verificaValidacoesForm(this.politicaDePrivacidadeForm);
          }



        }
      }



      verificaValidTouched(campo){

        return !this.politicaDePrivacidadeForm.get(campo).valid && (this.politicaDePrivacidadeForm.get(campo).touched || this.politicaDePrivacidadeForm.get(campo).dirty)
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


      editorConfig: AngularEditorConfig = {
        editable: true,
          spellcheck: true,
          height: '15rem',
          minHeight: '5rem',
          maxHeight: 'auto',
          width: 'auto',
          minWidth: '0',
          translate: 'yes',
          enableToolbar: true,
          showToolbar: true,
          placeholder: 'Enter text here...',
          defaultParagraphSeparator: 'space',
          defaultFontName: '',
          defaultFontSize: '',
          fonts: [
            {class: 'arial', name: 'Arial' },
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
        ],
        uploadUrl: 'v1/image',
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
          ['bold', 'italic'],
          ['fontSize']
        ]
    };


  }





