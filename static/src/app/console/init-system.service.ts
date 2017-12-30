import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SyncService {
  private baseUrl = 'api/console/sync';

  constructor(private http: HttpClient) {
  }

  initSystem(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl;
    return this.http.get(this.baseUrl, {headers})
  }
}
