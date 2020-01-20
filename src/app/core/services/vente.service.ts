import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private apiUrl = `${environment.apiUrl}TraitementLignes/`;
  constructor(private http: HttpClient) { }

  allCompagnieVente(hubId: number, dateInf: string, dateSup: string) {
    return this.http.post<any[]>(this.apiUrl + 'allCompagnieVente', {hubId, dateInf, dateSup});
  }

  oneCompagnieVente(hubId: number, dateInf: string, dateSup: string, agentId: number) {
    return this.http.post<any[]>(this.apiUrl + 'oneCompagnieVente', {hubId, dateInf, dateSup, agentId});
  }

  oneCompagnieVenteByDay(hubId: number, dateInf: string, agentId: number) {
    return this.http.post<any[]>(this.apiUrl + 'oneCompagnieVenteByDay', {hubId, dateInf, agentId});
  }

  oneCompagnieVenteByMonth(hubId: number, agentId: number, year: number, month: number) {
    return this.http.post<any[]>(this.apiUrl + 'oneCompagnieVenteByMonth', {hubId, agentId, year, month});
  }
}
