import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contato } from '../../interfaces/contato';
import { environment } from '../../../environments/environment';
import { take, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class SendMailService {

  // api
  // SendMailUrl = 'http://localhost:3333/sendmail'
  private readonly API = `${environment.SendMailUrl}`;

  constructor(private http: HttpClient) { }



  criar(contato: Contato) {
    // console.log(contato)

    return this.http.post(this.API, contato).pipe(take(1))



    // return this.http.post(this.API, contato)
  }


}
