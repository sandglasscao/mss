import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Team} from "./team";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TeamService {
  private baseUrl = 'api/users/team/';

  constructor(private http: HttpClient) {
  }

  listTeam(): Observable<Team[]> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.get<Team[]>(this.baseUrl, {headers});
  }
}
