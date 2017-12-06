import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {DashboardHome} from "./dashboard-home";

@Injectable()
export class DashboardHomeService {
  private baseUrl = 'api/users/home/';

  constructor(private http: Http) {
  }

  getSummary(): Promise<DashboardHome> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
