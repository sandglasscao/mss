import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Profile} from "./profile";
import {User} from "./user";

@Injectable()
export class ProfileService {
  private profileUrl = 'api/users/profile/';
  private changepwdUrl = 'api/users/changepwd';

  constructor(private http: Http) {
  }

  getProfile(username: string): Promise<Profile> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    let url = this.profileUrl + sessionStorage.getItem('username');
    return this.http
      .get(url, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  changePwd(user: User): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.put(this.changepwdUrl, JSON.stringify(user), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
