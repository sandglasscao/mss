import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Profile} from "../dashboard/profile";
import {Agent} from "./agent";

@Injectable()
export class SyncService {
  private baseUrl = 'api/console/sync';

  constructor(private http: Http) {
  }

  initSystem(): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl;
    return this.http
      .get(this.baseUrl, options)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
