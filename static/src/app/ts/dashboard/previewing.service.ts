import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http} from "@angular/http";

@Injectable()
export class PreviewImgService {

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
}
