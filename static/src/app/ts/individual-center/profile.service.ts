import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Profile} from "./profile";

@Injectable()
export class ProfileService {
  private profileUrl = 'api/users/profile/';

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

  updateProfile(profile: Profile): Promise<Profile> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.post(this.profileUrl, JSON.stringify(profile), {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
