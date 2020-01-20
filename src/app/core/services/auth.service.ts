import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {YobAuthUser} from '../models/YobAuthUser';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {map, first} from 'rxjs/operators';
import {AgentService} from './agent.service';
import {environment} from 'src/environments/environment';
import {YobBookproAgent} from '../models/YobBookproAgent';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.autBaseUrl}`;
  authModule = `${environment.authModule}`;
  authResource = `${environment.resource}`;
  public authenticate = false;
  currentUserSubject: BehaviorSubject<YobBookproAgent>;
  currentUser: Observable<YobBookproAgent>;

  constructor(private http: HttpClient, private agentSrc: AgentService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<YobBookproAgent>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): YobBookproAgent {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    this.authenticate = false;
    // const timesTampExp = new Date().getTime() + 10000;//86400000;
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>(this.baseUrl + 'post' + this.authModule + this.authResource + 'login&username=' + username + '&password=' + password);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('dateExp');
    // this.currentUserSubject.next(null);
    // this.authenticate = false;
    this.router.navigate(['/login']).catch();
  }

  public isAuthentificate(): boolean {
    if (localStorage.getItem('currentUser')) {
      const timestamp = new Date().getTime();
      const time = +localStorage.getItem('dateExp');
      console.log('BOOL :: ' + (timestamp <= time));
      return timestamp <= time;
    }
  }
}
