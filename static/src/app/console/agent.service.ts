import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Profile} from "../dashboard/profile";
import {User} from "../dashboard/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AgentService {
  private baseUrl = 'api/console/agent/';
  private resetPwdUrl = 'api/users/changepwd/';

  constructor(private http: HttpClient) {
  }

  listAgent(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.get(this.baseUrl, {headers})
  }

  createAgent(agent: Profile): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.post(this.baseUrl, agent, {headers})
  }

  delAgent(agent: Profile): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + agent.id;
    let toDel = {'isDeleted': true};
    return this.http.put(url, toDel, {headers})
  }

  paginate(link: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.get(link, {headers})
  }

  resetPwd(user: User): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.put(this.resetPwdUrl, user, {headers})
  }
  checks(agent: Profile): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + agent.id;
    let toStatus = {'status': true};
    return this.http.put(url, toStatus, {headers})
  }
}
