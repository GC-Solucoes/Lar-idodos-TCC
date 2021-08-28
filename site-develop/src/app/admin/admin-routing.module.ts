import { NoticiasComponent } from './noticias/noticias.component';
import { AuthGuard } from './guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PostagemComponent } from './postagem/postagem.component';
import { BannerComponent } from '../admin/banner/banner.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditarComponent } from './usuario/editar/editar.component';
import { EditarPostagemComponent } from './postagem/editar-postagem/editar-postagem.component';
import { EditarBannerComponent } from '../admin/banner/editar-banner/editar-banner.component'
import { OndeEstamosAdminComponent } from './onde-estamos-admin/onde-estamos-admin.component';
import { EditarOndeEstamosComponent } from './onde-estamos-admin/editar-onde-estamos/editar-onde-estamos.component';
import { CarouselAdminComponent } from './carousel-admin/carousel-admin.component';
import { EditarCarouselAdminComponent } from './carousel-admin/editar-carousel-admin/editar-carousel-admin.component';
import { PoliticasDePrivacidadeComponent } from './politicas-de-privacidade/politicas-de-privacidade.component';
import { EditarPoliticasDePrivacidadeComponent } from './politicas-de-privacidade/editar-politicas-de-privacidade/editar-politicas-de-privacidade.component';
const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      //cplocar rotas filhas


    ],

  },
  //usuário
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
  //criar usuário
  { path: 'usuarios/criar', component: EditarComponent, canActivate: [AuthGuard] },
  //editar usuário
  { path: 'usuarios/editar/:id', component: EditarComponent, canActivate: [AuthGuard] },
  // postagem
  { path: 'postagem', component: PostagemComponent, canActivate: [AuthGuard] },
  //postagem criar
  { path: 'postagem/criar', component: EditarPostagemComponent, canActivate: [AuthGuard] },
  //postagem editar
  { path: 'postagem/editar/:id', component: EditarPostagemComponent, canActivate: [AuthGuard] },
  //onde estamos admin
  { path: 'onde-estamos', component: OndeEstamosAdminComponent, canActivate: [AuthGuard] },
  //criar onde-estamos
  { path: 'onde-estamos/criar', component: EditarOndeEstamosComponent, canActivate: [AuthGuard] },
  //editar onde-estamos
  { path: 'onde-estamos/editar/:id', component: EditarOndeEstamosComponent, canActivate: [AuthGuard] },
  //carousel admin
  { path: 'carousel', component: CarouselAdminComponent, canActivate: [AuthGuard] },
  //criar carousel
  { path: 'carousel/criar', component: EditarCarouselAdminComponent, canActivate: [AuthGuard] },
  //editar carousel
  { path: 'carousel/editar/:id', component: EditarCarouselAdminComponent, canActivate: [AuthGuard] },
  //Listar Banner
  { path: 'banners', component: BannerComponent, canActivate: [AuthGuard] },
  //criar banner
  { path: 'banners/criar', component: EditarBannerComponent, canActivate: [AuthGuard] },
  //editar banner
  { path: 'banners/editar/:id', component: EditarBannerComponent, canActivate: [AuthGuard] },
  //noticias
  // { path: 'noticias', component: NoticiasComponent },
  //politicas de privacidade
  { path: 'politicas-de-privacidade', component: PoliticasDePrivacidadeComponent, canActivate: [AuthGuard] },
  // editar politicas
  { path: 'politicas-de-privacidade/editar/:id', component: EditarPoliticasDePrivacidadeComponent, canActivate: [AuthGuard] },

  //login
  // {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
