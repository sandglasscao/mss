import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {User} from './dashboard/user';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class CellphoneResetService {
  private baseUrl = 'api/users/cell-verify/';

  constructor(private http: Http) {
  }

  check(account: User): Promise<User> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(account), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(CellphoneResetService.handleError);
  }

  private static handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
