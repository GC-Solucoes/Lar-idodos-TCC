import { Banner } from './interfaces-banner/banner';
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
export class BannerService {

  private readonly API = `${environment.apiUrl}/banners`;


  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get<Banner[]>(`${environment.apiUrl}/banners`);
  }

  getById(id: number) {
    return this.http.get<Banner>(`${environment.apiUrl}/banners/${id}`);
  }

  post(banner: Banner) {
    return this.http.post<any>(`${environment.apiUrl}/banners`, banner);
  }

  put( id: number, imagem:File, links:string,): Observable<HttpEvent<any>> {
    // return this.http.put(`${environment.apiUrl}/banners/${id}`, banner);
    const formData: FormData = new FormData();

    formData.append('imagens', imagem);
     formData.append('links', links);



    const req = new HttpRequest('PUT',`${environment.apiUrl}/banners/${id}`, formData );


    return this.http.request(req);
  }


  delete (id:number,) {
    return this.http.delete(`${environment.apiUrl}/banners/${id}`, ) ;
  }

  importarArquivo(imagem:File, links:string): Observable<HttpEvent<any>> {
    // instanciando formData para utilizar no req
    const formData: FormData = new FormData();

    formData.append('imagens', imagem);
     formData.append('links', links);



    const req = new HttpRequest('POST',`${environment.apiUrl}/banners`, formData );


    return this.http.request(req);
}



}


