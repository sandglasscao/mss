import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Registration} from "./registration";

@Injectable()
export class RegistraterService {
  private baseUrl = 'api/user/register';

  constructor(private http: Http) {
  }

  checkCell(cell: String): Promise<Registration> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    let cellJson = {cell: cell};
    return this.http
      .post(this.baseUrl, cellJson, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  register(registration: Registration): Promise<Registration> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(registration), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
