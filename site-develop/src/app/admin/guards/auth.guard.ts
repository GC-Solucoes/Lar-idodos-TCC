import { LoginService } from './../login/login.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot , RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private loginService: LoginService,
    private router: Router) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ) : Observable<boolean> | boolean {

    if(this.loginService.loggedIn()) {
      return true;
    } else {


this.router.navigate(['/login'])

      return false;
    }

  }



}
