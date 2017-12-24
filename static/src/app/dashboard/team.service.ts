import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Team} from "./team";

@Injectable()
export class TeamService {
  private baseUrl = 'api/users/team/';

  constructor(private http: Http) {
  }

  listTeam(): Promise<Team[]> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.baseUrl, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(error => TeamService.handleError(error));
  }

  private static handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
