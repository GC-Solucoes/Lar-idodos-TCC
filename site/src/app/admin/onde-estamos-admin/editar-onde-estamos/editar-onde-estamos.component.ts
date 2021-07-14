import { OndeEstamos } from '../interface onde-estamos/onde-estamos';
import { Component, OnInit } from '@angular/core';
import { OndeEstamosService } from '../onde-estamos.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-onde-estamos',
  templateUrl: './editar-onde-estamos.component.html',
  styleUrls: ['./editar-onde-estamos.component.scss']
})
export class EditarOndeEstamosComponent implements OnInit {
  selectedFiles: FileList;
  ondeEstamos = new OndeEstamos();
  ondeEstamosForm: FormGroup
  routeSub: any;
  currentId: number;
  currentFile: File;
  currentTitulo: string;
  currentTel: string;
  currentAddress: string;
  progress = 0;
  message = '';
  submitted = false;
  formInvalid = false;
  errorMessage = '';
  sendSuccess = false;
  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private OndeEstamosService: OndeEstamosService

  ) { }

  ngOnInit(): void {
    this.ondeEstamosForm = this.formBuilder.group({
      id: [''],
      ondeEstamosTitulo: ['', [Validators.required, Validators.minLength(5)]],
      ondeEstamosAddress: ['', [Validators.required, Validators.minLength(5)]],
      ondeEstamosTel: ['', [Validators.required, Validators.minLength(5)]],
      ondeEstamosImagem: ['', []],
    });



    this.routeSub = this.route.params.subscribe((params) => {
      var id: number = params['id'];

      if (id) {
        this.OndeEstamosService
          .getById(id)
          .pipe()
          .subscribe((ondeEstamos) => {
            this.currentId = ondeEstamos.id;
            this.currentTitulo = ondeEstamos.ondeEstamosTitulo;
            this.currentAddress = ondeEstamos.ondeEstamosAddress;
            this.currentTel = ondeEstamos.ondeEstamosTel;
          });
      }
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.message = '';
  }




  onSubmit() {
    if (this.currentId > 0) {
      if (this.ondeEstamosForm.valid) {

        if (this.selectedFiles) {
          this.currentFile = this.selectedFiles.item(0);
        }

        this.OndeEstamosService.put(this.currentId, this.currentFile, this.currentTitulo, this.currentTel, this.currentAddress)
          .subscribe(
            (response) => {
              console.log('Onde Estamos atualizado com sucesso.');
              alert("Onde Estamos  com sucesso.");
              this.router.navigate(['admin/onde-estamos']);
            },
            (error) => {
              console.log(
                'Não foi possível atualizar o Onde Estamos.'
              );
            }
          );
        this.selectedFiles = undefined;

      } else {
        console.log('Formulário Inválido');
        alert('ERRO, verifique os campos');
        this.verificaValidacoesForm(this.ondeEstamosForm);
      }
    } else {
      this.progress = 0;
      this.message = '';

      if (this.ondeEstamosForm.valid) {
        this.currentFile = this.selectedFiles.item(0);
        this.OndeEstamosService.importarArquivo(this.currentFile, this.currentTitulo, this.currentTel, this.currentAddress).subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(
                (100 * event.loaded) / (event.total ? event.total : 0)
              );
            } else if (event instanceof HttpResponse) {
              this.currentFile = undefined;
              this.currentTitulo = undefined;
              this.currentTel = undefined;
              this.currentAddress = undefined;

              // this.toastr.success('Arquivo importado com sucesso.');

            }
            alert("Onde Estamos Criado com sucesso.");
            this.router.navigate(['admin/onde-estamos']);

          },
          (err) => {
            this.progress = 0;
            this.message = (err as string) ? err : err.message;
            // this.currentFile = undefined;
            // this.toastr.error(this.message);
          }
        );
        this.selectedFiles = undefined;
      } else {
        console.log('Formulário Inválido');
        alert('ERRO, verifique os campos');
        this.verificaValidacoesForm(this.ondeEstamosForm);
      }


    }
  }


  verificaValidTouched(campo) {

    return !this.ondeEstamosForm.get(campo).valid && (this.ondeEstamosForm.get(campo).touched || this.ondeEstamosForm.get(campo).dirty)
  }


  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
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
    if (this.router.url === '/criar') {
      this.currentId = 0;
    } else {
      this.currentId = 1;
    }
  }










}
