import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Pic} from "./pic";

@Injectable()
export class PreviewImgService {
  private baseUrl = '/login/';

  constructor(private http: Http) { }
  private url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=s';


  getReader(resolve, reject) {
    let reader = new FileReader();
    reader.onload = this.Onload(reader, resolve);
    reader.onerror = this.OnError(reader, reject);
    return reader;
  }
  readAsDataUrl(file) {
    let that = this;
    return new Promise(function(resolve, reject){
      let reader = that.getReader(resolve, reject);
      reader.readAsDataURL(file);
    });
  }

  Onload(reader: FileReader, resolve) {
    return () => {
      resolve(reader.result);
    };
  }

  OnError(reader: FileReader, reject) {
    return () => {
      reject(reader.result);
    };
  }


  subs(pic: Pic): Promise<any> {
    let headers = new Headers({'X-CSRFToken': 'csrftoken'});
    headers.set('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(this.baseUrl, JSON.stringify(pic), options)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }
  private handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
