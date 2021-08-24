import { Carousel } from '../interface-carousel-admin/carousel';
import { Component, OnInit } from '@angular/core';
import { CarouselAdminService } from '../carousel-admin.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-carousel-admin',
  templateUrl: './editar-carousel-admin.component.html',
  styleUrls: ['./editar-carousel-admin.component.scss']
})
export class EditarCarouselAdminComponent implements OnInit {
  editarCarouselForm: FormGroup
  selectedFiles: FileList;
  Carousels = new Carousel();
  routeSub: any;
  currentId: number;
  currentFile: File;
  currentTitulo: string;
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
    private CarouselAdminService: CarouselAdminService
  ) { }

  ngOnInit(): void {

    this.editarCarouselForm = this.formBuilder.group({
      id: [''],
      carouselTitulo: ['', [Validators.minLength(5)]],
      carouselImagens: ['', []],

    });




    this.routeSub = this.route.params.subscribe((params) => {
      var id: number = params['id'];

      if (id) {
        this.CarouselAdminService
          .getById(id)
          .pipe()
          .subscribe((Carousels) => {
            this.currentId = Carousels.id;
            this.currentTitulo = Carousels.carouselTitulo;
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
      if (this.editarCarouselForm.valid) {
        if (this.selectedFiles) {
          this.currentFile = this.selectedFiles.item(0);
        }

        this.CarouselAdminService.put(this.currentId, this.currentFile, this.currentTitulo)
          .subscribe(
            (response) => {
              console.log('Carousel atualizado com sucesso.');
              alert("Carousel atualizado com sucesso.");
              this.router.navigate(['admin/carousel']);
            },
            (error) => {
              console.log(
                'Não foi possível atualizar o Carousel.'
              );
            }
          );
        this.selectedFiles = undefined;
      } else {
        console.log('Formulário Inválido');
        alert('ERRO, verifique os campos');
        this.verificaValidacoesForm(this.editarCarouselForm);
      }
    } else {
      this.progress = 0;
      this.message = '';

      if (this.editarCarouselForm.valid) {
        this.currentFile = this.selectedFiles.item(0);
        this.CarouselAdminService.importarArquivo(this.currentFile, this.currentTitulo).subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(
                (100 * event.loaded) / (event.total ? event.total : 0)
              );
            } else if (event instanceof HttpResponse) {
              this.currentFile = undefined;
              this.currentTitulo = undefined;

            }
            alert("Carrossel Criado com sucesso.");
            this.router.navigate(['admin/carousel']);
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
        this.verificaValidacoesForm(this.editarCarouselForm);
      }
    }
  }






  verificaValidTouched(campo) {

    return !this.editarCarouselForm.get(campo).valid && (this.editarCarouselForm.get(campo).touched || this.editarCarouselForm.get(campo).dirty)
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
