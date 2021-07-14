import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Postagem} from './postagem';
import { environment } from '../../../environments/environment';
import { take, delay, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostagemService {


  private readonly API_Postagem = `${environment.postagem}`;
  private readonly API_Url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  criar(postagem: Postagem) {
    // console.log(contato)

    return this.http.post(this.API_Postagem, postagem).pipe(take(1))



    // return this.http.post(this.API, contato)
  }


  getAll() {
    return this.http.get<Postagem[]>(`${this.API_Postagem}`);
}

getById(id: number) {
    return this.http.get<Postagem>(`${this.API_Postagem}${id}`);
}

  post(postagem: Postagem) {
    return this.http.post<any>(`${this.API_Postagem}`, postagem);
}

 delete (id:number,) {
  return this.http.delete(`${this.API_Postagem}${id}`, ) ;
}




  put(postagem: Postagem, id:number) {
    return this.http.put(`${this.API_Postagem}${id}`, postagem);
}



}



