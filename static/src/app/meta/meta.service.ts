import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MetaService {
  private baseUrl = 'api/meta/storestatus/';

  constructor(private http: HttpClient) {
  }

  listStoreStatus(code: string): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + code;
    return this.http.get(url, {headers})
  }
}
