import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Profile} from "../dashboard/profile";
import {User} from "../dashboard/user";

@Injectable()
export class AgentService {
  private baseUrl = 'api/console/agent/';
  private resetPwdUrl = 'api/users/changepwd/';

  constructor(private http: Http) {
  }

  listAgent(): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  createAgent(agent: Profile): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(agent), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  paginate(link: string) {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.get(link, {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  resetPwd(user: User): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + 'resetpwd';
    return this.http
      .put(url, JSON.stringify(user), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
