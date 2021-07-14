import { OndeEstamos } from './interface onde-estamos/onde-estamos';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OndeEstamosService {

  private readonly API = `${environment.apiUrl}/onde-estamos`;

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get<OndeEstamos[]>(`${environment.apiUrl}/onde-estamos`);
  }

  getById(id: number) {
    return this.http.get<OndeEstamos>(`${environment.apiUrl}/onde-estamos/${id}`);
  }

  post(ondeEstamos: OndeEstamos) {
    return this.http.post<any>(`${environment.apiUrl}/onde-estamos`, ondeEstamos);
  }

  put( id: number, ondeEstamosImagem:File, ondeEstamosTitulo:string, ondeEstamosAddress:string, ondeEstamosTel:string ): Observable<HttpEvent<any>> {
    // return this.http.put(`${environment.apiUrl}/banners/${id}`, banner);
    const formData: FormData = new FormData();

    formData.append('ondeEstamosImagem', ondeEstamosImagem);
     formData.append('ondeEstamosTitulo', ondeEstamosTitulo);
     formData.append('ondeEstamosAddress', ondeEstamosAddress);
     formData.append('ondeEstamosTel', ondeEstamosTel);



    const req = new HttpRequest('PUT',`${environment.apiUrl}/onde-estamos/${id}`, formData );


    return this.http.request(req);
  }

  delete (id:number,) {
    return this.http.delete(`${environment.apiUrl}/onde-estamos/${id}`, ) ;
  }


  importarArquivo( ondeEstamosImagem:File, ondeEstamosTitulo:string, ondeEstamosAddress:string, ondeEstamosTel:string ): Observable<HttpEvent<any>> {
    // instanciando formData para utilizar no req
    const formData: FormData = new FormData();

    formData.append('ondeEstamosImagem', ondeEstamosImagem);
     formData.append('ondeEstamosTitulo', ondeEstamosTitulo);
     formData.append('ondeEstamosAddress', ondeEstamosAddress);
     formData.append('ondeEstamosTel', ondeEstamosTel);




    const req = new HttpRequest('POST',`${environment.apiUrl}/onde-estamos`, formData );


    return this.http.request(req);
}





}
