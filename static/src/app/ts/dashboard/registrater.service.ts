import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Registration} from "./registration";
import {Profile} from "../individual-center/profile";

@Injectable()
export class RegisterService {
  private baseUrl = 'api/users/';
  private regUrl = 'api/users/register/';
  private profileUrl = 'api/users/profile/';

  constructor(private http: Http) {
  }

  getProfile(): Promise<Profile> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.profileUrl + sessionStorage.getItem('username');
    return this.http
      .get(url, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  updateProfile(profile: Profile): Promise<Profile> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.profileUrl + sessionStorage.getItem("weidcode");
    return this.http.put(url, JSON.stringify(profile), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  register(registration: Registration): Promise<Registration> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.regUrl, JSON.stringify(registration), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  getAgentName(agentCode: string): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + agentCode;
    return this.http
      .get(url, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
