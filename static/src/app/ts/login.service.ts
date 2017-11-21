import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {User} from "./user"
import {Headers, Http, RequestOptions} from "@angular/http";

@Injectable()
export class LoginService {
  private baseUrl = '/login/';

  constructor(private http: Http) {
  }

  login(account: User): Promise<User> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(account), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
