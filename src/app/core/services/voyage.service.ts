import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  private apiUrl = `${environment.apiUrl}TraitementLignes/`;

  constructor(private http: HttpClient) {
  }


  allCompagnieVoyage(hubId: number, dateInf: string, dateSup: string) {
    return this.http.post<any[]>(this.apiUrl + 'allCompagnieVoyage', {hubId, dateInf, dateSup});
  }

  oneCompagnieVoyage(hubId: number, dateInf: string, dateSup: string, agentId: number) {
    return this.http.post<any[]>(this.apiUrl + 'oneCompagnieVoyage', {hubId, dateInf, dateSup, agentId});
  }

  oneCompagnieVoyageByDay(hubId: number, dateInf: string, agentId: number) {
    return this.http.post<any[]>(this.apiUrl + 'oneCompagnieVoyageByDay', {hubId, dateInf, agentId});
  }

  oneCompagnieVoyageByMonth(hubId: number, agentId: number, year: number, month: number) {
    return this.http.post<any[]>(this.apiUrl + 'oneCompagnieVoyageByMonth', {hubId, agentId, year, month});
  }
}
