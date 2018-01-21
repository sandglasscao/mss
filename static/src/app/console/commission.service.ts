import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Commission} from "./commission";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CommissionService {
  private baseUrl = 'api/console/cmmssn/';

  constructor(private http: HttpClient) {
  }

  getCmmssn(): Observable<Commission[]> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.get<Commission[]>(this.baseUrl, {headers})
  }

  createCmmssn(commission: Commission): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.post(this.baseUrl, commission, {headers})
  }

  updateCmmssn(commission: Commission): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + commission.id;
    return this.http.put(url, commission, {headers})
  }
}
