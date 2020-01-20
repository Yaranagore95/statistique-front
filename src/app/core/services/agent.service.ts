import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {YobBookproAgent} from '../models/YobBookproAgent';

@Injectable({
    providedIn: 'root'
})
export class AgentService {

    private apiUrl = `${environment.apiUrl}YobBookproAgent/`;

    constructor(private http: HttpClient) {
    }

    getCompany() {
        return this.http.get<YobBookproAgent[]>(this.apiUrl + 'agents');
    }

  agents() {
    return this.http.get<YobBookproAgent[]>(this.apiUrl + 'agents');
  }

  agent(agentId: number) {
    return this.http.get<YobBookproAgent>(this.apiUrl + 'agent/' + agentId);
  }

  agentByUserId(userId: number) {
    return this.http.get<YobBookproAgent>(this.apiUrl + 'agentByUserId/' + userId);
  }
}
