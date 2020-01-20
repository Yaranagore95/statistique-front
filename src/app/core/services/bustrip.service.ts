import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BustripService {

  private apiUrl = `${environment.apiUrl}TraitementLignes/`;
  constructor(private http: HttpClient) { }

  distinctRoutesByAgent(hubId: number, agentId: number) {
    return this.http.post<any[]>(this.apiUrl + 'distinctLignesByAgent', {hubId, agentId});
  }
}
