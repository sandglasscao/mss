import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Profile} from "./profile"
import {Headers, Http, RequestOptions} from "@angular/http";

@Injectable()
export class LoginService {
  private baseUrl = '/login/';
  private _cookieName = 'XSRF-TOKEN';

  constructor(private http: Http) {
  }

  login(profile: Profile): Promise<Profile> {
    //XSRF-TOKEN
    let headers = new Headers({'XSRF-TOKEN': this._cookieName});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(profile), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
