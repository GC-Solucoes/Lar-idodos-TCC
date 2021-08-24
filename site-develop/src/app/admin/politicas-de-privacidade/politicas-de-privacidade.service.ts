import { PoliticaDePrivacidade } from './interface-politica-de-privacidade/politica-de-privacidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { take, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoliticasDePrivacidadeService {

  private readonly API_Privacy = `${environment.privacidade}`;

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get<PoliticaDePrivacidade[]>(`${this.API_Privacy}`);
}

getById(id: number) {
  return this.http.get<PoliticaDePrivacidade>(`${this.API_Privacy}${id}`);
}

put(politicaPrivacidade: PoliticaDePrivacidade, id:number) {
  return this.http.put(`${this.API_Privacy}${id}`, politicaPrivacidade);
}


}
