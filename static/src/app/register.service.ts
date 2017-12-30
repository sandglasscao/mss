import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Registration} from "./registration";
import {Profile} from "./dashboard/profile";

@Injectable()
export class RegisterService {
  private baseUrl = 'api/users/';

  constructor(private http: Http) {
  }

  cellExist(cellphone: string): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + 'cell/';
    return this.http
      .post(url, JSON.stringify({'cellphone': cellphone}), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(RegisterService.handleError);
  }

  getAgentName(agentCode: string): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + agentCode;
    return this.http
      .get(url, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(RegisterService.handleError);
  }

  getProfile(): Promise<Profile> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + 'profile/' + sessionStorage.getItem('username');
    return this.http
      .get(url, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(RegisterService.handleError);
  }

  register(registration: Registration): Promise<Registration> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + 'register/';
    return this.http
      .post(url, JSON.stringify(registration), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(RegisterService.handleError);
  }

  updateProfile(profile: Profile): Promise<Profile> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + 'profile/' + sessionStorage.getItem("username");
    return this.http.put(url, JSON.stringify(profile), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(RegisterService.handleError);
  }

  private static handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
