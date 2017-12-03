import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Commission} from "./commission";

@Injectable()
export class CommissionService {
  private baseUrl = 'api/console/cmmssn/';

  constructor(private http: Http) {
  }

  getCmmssn(): Promise<Commission[]> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  createCmmssn(commission: Commission): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(commission), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  updateCmmssn(commission: Commission): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.baseUrl + commission.pk;
    return this.http
      .put(this.baseUrl, JSON.stringify(commission), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
