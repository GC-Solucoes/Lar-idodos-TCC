import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import { PostagemComponent } from './postagem/postagem.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './login/token-interceptor.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditarComponent } from './usuario/editar/editar.component';
import { EditarPostagemComponent } from './postagem/editar-postagem/editar-postagem.component';
import { EditarBannerComponent } from './banner/editar-banner/editar-banner.component';
import { RouterModule } from '@angular/router';
import { OndeEstamosAdminComponent } from './onde-estamos-admin/onde-estamos-admin.component';
import { EditarOndeEstamosComponent } from './onde-estamos-admin/editar-onde-estamos/editar-onde-estamos.component';
import { CarouselAdminComponent } from './carousel-admin/carousel-admin.component';
import { EditarCarouselAdminComponent } from './carousel-admin/editar-carousel-admin/editar-carousel-admin.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { PoliticasDePrivacidadeComponent } from './politicas-de-privacidade/politicas-de-privacidade.component';
import { EditarPoliticasDePrivacidadeComponent } from './politicas-de-privacidade/editar-politicas-de-privacidade/editar-politicas-de-privacidade.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NoticiasComponent } from './noticias/noticias.component';

@NgModule({

  imports: [
    CommonModule,
    CKEditorModule,
    AdminRoutingModule,
    AngularEditorModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [AdminComponent, PostagemComponent, BannerComponent, LoginComponent, UsuarioComponent, EditarComponent, EditarPostagemComponent, EditarBannerComponent, OndeEstamosAdminComponent, EditarOndeEstamosComponent, CarouselAdminComponent, EditarCarouselAdminComponent, PasswordStrengthComponent, CampoControlErrorComponent, PoliticasDePrivacidadeComponent, EditarPoliticasDePrivacidadeComponent, NoticiasComponent,],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true , },AuthGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
