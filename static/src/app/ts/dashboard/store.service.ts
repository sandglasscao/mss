import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Store} from "./store";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StoreService {
  private storeUrl = 'api/users/store/';
  myStores: Store[];

  constructor(private http: Http) {
  }

  listStore(): Promise<Store[]> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.append('Authorization', "JWT " + sessionStorage.getItem('token'));
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(this.storeUrl, options)
      .toPromise()
      .then(resp => resp.json())
      .catch(error => StoreService.handleError(error));
  }

  getStores() {
    return this.myStores;
  }

  getStore(id: number | string) {
    return this.getStores()
      // (+) before `id` turns the string into a number
      .find(store => store.id === +id);
  }

  private static handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
