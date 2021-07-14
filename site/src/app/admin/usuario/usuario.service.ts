import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../admin/login/User/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }



getAll() {
  return this.http.get<User[]>(`${environment.apiUrl}/users`);
}

getById(id: number) {
  return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
}

post(user: User) {
  return this.http.post<any>(`${environment.apiUrl}/users`, user);
}

put(user: User, id: number) {
  return this.http.put(`${environment.apiUrl}/users/${id}`, user);
}

delete (id:number,) {
  return this.http.delete(`${environment.apiUrl}/users/${id}`, ) ;
}


}
