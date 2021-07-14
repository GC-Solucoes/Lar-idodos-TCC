import { LoginComponent } from './admin/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './admin/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent

  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuard]

  },


  {
    path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },




  // { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
