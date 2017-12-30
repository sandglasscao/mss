import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class SMSService {
  private smsUrl = '/sms/';


  constructor(private http: HttpClient) {
  }

  sendSMS(cellphone: string): Promise<any> {
    let headers = new HttpHeaders({'X-CSRFToken': 'csrftoken'});
    let options = {headers: headers};
    let url = this.smsUrl + 'send/' + cellphone;
    return this.http
      .get(url, options)
      .toPromise()
      .catch(SMSService.handleError);
  }

  verifySMS(cellphone: string, code: string): Promise<any> {
    let headers = new HttpHeaders({'X-CSRFToken': 'csrftoken'});
    let options = {headers: headers};
    let url = this.smsUrl + 'verify/' + cellphone  + '/'+ code;
    return this.http
      .get(url, options)
      .toPromise()
      .catch(SMSService.handleError);
  }

  private static handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
