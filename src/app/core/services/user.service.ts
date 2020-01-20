import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {YobAuthUser} from '../models/YobAuthUser';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}YobUsers/`;
  constructor(private http: HttpClient) { }

  getByUsername(username: string) {
    return this.http.post<YobAuthUser>(this.apiUrl + 'findOne', {username});
  }
}
