import { Carousel } from './interface-carousel-admin/carousel';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarouselAdminService {

  private readonly API = `${environment.apiUrl}/carousel`;

  constructor(private http: HttpClient) { }




  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/carousel`);
  }

  getById(id: number) {
    return this.http.get<Carousel>(`${environment.apiUrl}/carousel/${id}`);
  }

  post(ondeEstamos: Carousel) {
    return this.http.post<any>(`${environment.apiUrl}/carousel`, Carousel);
  }

  put( id: number, carouselImagens:File, carouselTitulo:string): Observable<HttpEvent<any>> {
    // return this.http.put(`${environment.apiUrl}/banners/${id}`, banner);
    const formData: FormData = new FormData();

    formData.append('carouselImagens', carouselImagens);
     formData.append('carouselTitulo', carouselTitulo);




    const req = new HttpRequest('PUT',`${environment.apiUrl}/carousel/${id}`, formData );


    return this.http.request(req);
  }

  delete (id:number,) {
    return this.http.delete(`${environment.apiUrl}/carousel/${id}`, ) ;
  }


  importarArquivo( carouselImagens:File, carouselTitulo:string): Observable<HttpEvent<any>> {
    // instanciando formData para utilizar no req
    const formData: FormData = new FormData();

    formData.append('carouselImagens', carouselImagens);
    formData.append('carouselTitulo', carouselTitulo);




    const req = new HttpRequest('POST',`${environment.apiUrl}/carousel`, formData );


    return this.http.request(req);
}


}
