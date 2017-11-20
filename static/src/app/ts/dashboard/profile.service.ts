import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Profile} from './profile'

@Injectable()
export class ProfileService {
  private baseUrl = 'api/users/';  // URL to web api
  private _cookieName = 'XSRF-TOKEN';

  constructor(private http: Http) {
  }

  retrieveProfile(account: string): Promise<Profile> {
    let headers = new Headers({'XSRF-TOKEN': this._cookieName});
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', "JWT " + sessionStorage.getItem('token'))
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + account;
    return this.http.get(url, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);

  }

  updateProfile(profile: Profile): Promise<Profile> {
    let headers = new Headers({'XSRF-TOKEN': this._cookieName});
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', "JWT " + sessionStorage.getItem('token'))
    let options = new RequestOptions({headers: headers});
    /*
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-CSRFToken', this._cookieService.get("csrftoken"));
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    */
    let url = this.baseUrl + sessionStorage.getItem("account");
    return this.http.put(url, JSON.stringify(profile), {headers: headers})
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
