import { Banner } from '../interfaces-banner/banner';
import { Component, OnInit } from '@angular/core';
import { BannerService } from '../banner.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-banner',
  templateUrl: './editar-banner.component.html',
  styleUrls: ['./editar-banner.component.scss']
})
export class EditarBannerComponent implements OnInit {
  selectedFiles: FileList;
  bannerForm: FormGroup
  // banner = new Banner();
  routeSub: any;
  currentId: number;
  currentFile: File;
  currentString: string;
  progress = 0;
  message = '';
  submitted = false;
  formInvalid = false;
  errorMessage = '';
  sendSuccess = false;
  error = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private BannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.bannerForm = this.formBuilder.group({
      id: [''],
      links: ['', [Validators.required, Validators.minLength(5)]],
      imagens: ['', []],
    });

    this.routeSub = this.route.params.subscribe((params) => {
      var id: number = params['id'];

      if (id) {
        this.BannerService
          .getById(id)
          .pipe()
          .subscribe((banner) => {
            this.currentId = banner.id;
            this.currentString = banner.links;
            // this.currentFile = banner.imagens;
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
      if (this.bannerForm.valid) {

        if (this.selectedFiles) {
          this.currentFile = this.selectedFiles.item(0);
        }

        //  this.currentFile =
        this.BannerService.put(this.currentId, this.currentFile, this.currentString,).subscribe(
          (response) => {
            console.log('Banner atualizado com sucesso.');
            alert("Banner atualizado com sucesso.");
            this.router.navigate(['admin/banners']);
          },
          (error) => {
            console.log(
              'Não foi possível atualizar o banner.'
            );
          }
        );
        this.selectedFiles = undefined;
      } else {
        console.log('Formulário Inválido');
        alert('ERRO, verifique os campos');
        this.verificaValidacoesForm(this.bannerForm);
      }

    } else {

      this.progress = 0;
      this.message = '';

      if (this.bannerForm.valid) {
        this.currentFile = this.selectedFiles.item(0);
        this.BannerService.importarArquivo(this.currentFile, this.currentString).subscribe(
          (event) => {

            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(

                (100 * event.loaded) / (event.total ? event.total : 0)
              );
            } else if (event instanceof HttpResponse) {
              this.currentFile = undefined;
              this.currentString = undefined;
              // this.toastr.success('Arquivo importado com sucesso.');


            }
            alert("Banner Criado com sucesso.");
            this.router.navigate(['admin/banners']);
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
        this.verificaValidacoesForm(this.bannerForm);
      }

    }
  }

  verificaValidTouched(campo) {

    return !this.bannerForm.get(campo).valid && (this.bannerForm.get(campo).touched || this.bannerForm.get(campo).dirty)
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
