import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Profile} from "../dashboard/profile";
import {NewAgent} from "./newagent";

@Injectable()
export class AgentService {
  private baseUrl = 'api/console/agent/';

  constructor(private http: Http) {
  }

  listAgent(): Promise<Profile[]> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  createAgent(agent: NewAgent): Promise<any> {
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

  updateAgent(profile: Profile): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + profile.id;
    return this.http
      .put(this.baseUrl, JSON.stringify(profile), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
