import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './User/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(private router: Router, private http: HttpClient,) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') || 'null')
  );

  this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
}

login(email: string, password: string) {
  return this.http
      .post<any>(`${environment.apiUrl}/login`, {
         email,
          password,
      })
      .pipe(
          map((user) => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          })

      );

}


loggedIn() {
  return !!localStorage.getItem('user')

}

getToken(){
  return JSON.parse(localStorage.getItem('user'))
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  this.userSubject.next(JSON.parse('null'));
  this.router.navigate(['/login']);
}


usuarioAutenticado() {
  return this.loggedIn
}


}
