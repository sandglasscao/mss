import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Store} from "./store";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class StoreService {
  private storeUrl = 'api/users/store/';
  myStores: Store[];

  constructor(private http: HttpClient) {
  }

  listStore(): Observable<Store[]> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    return this.http.get<Store[]>(this.storeUrl, {headers});
  }

  getStores() {
    return this.myStores;
  }

  getStore(id: number | string) {
    return this.getStores()
    // (+) before `id` turns the string into a number
      .find(store => store.id === +id);
  }

  saveLatlng(store: Store): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.storeUrl + store.id;
    let ll = {'latitude': store.latitude, 'longitude': store.longitude};
    return this.http.patch(url, ll, {headers})
  }

  uploadPic(storeId: number, formData: FormData): Observable<any> {
    let headers = new HttpHeaders()
      .append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.storeUrl + storeId;
    return this.http.patch(url, formData, {headers})
  }
}
