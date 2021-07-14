import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {LoginService} from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }


  intercept(req, next) {
    let loginService = this.injector.get(LoginService)
    const user = loginService.getToken()
    let tokenReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${user?.token}`
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTYyMDM5NTg3M30.KWkKpjPTYeDkHMH667CtcpAhnHEmGYIOBDYjUPWS4Pg'
      }
    })
    return next.handle(tokenReq)
  }
}
