import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {DashboardHome} from "./dashboard-home";

@Injectable()
export class DashboardHomeService {
  private baseUrl = 'api/users/home/';

  constructor(private http: HttpClient) {
  }

  getSummary(): Observable<DashboardHome> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http
      .get<DashboardHome>(this.baseUrl, {headers})
  }
}
