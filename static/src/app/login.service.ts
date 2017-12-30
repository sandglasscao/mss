import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {User} from "./dashboard/user"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {
  private baseUrl = '/login/';

  constructor(private http: HttpClient) {
  }

  login(account: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, account)
  }
}
