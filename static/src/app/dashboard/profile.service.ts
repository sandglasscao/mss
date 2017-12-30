import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Profile} from "./profile";
import {User} from "./user";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ProfileService {
  private profileUrl = 'api/users/profile/';
  private changepwdUrl = 'api/users/changepwd/';

  constructor(private http: HttpClient) {
  }

  getProfile(username: string): Observable<Profile> {
    let url = this.profileUrl + sessionStorage.getItem('username');
    return this.http.get<Profile>(url)
  }

  changePwd(user: User): Observable<Profile> {
    let headers = new HttpHeaders().set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.put<Profile>(this.changepwdUrl, user, {headers})
  }
}
