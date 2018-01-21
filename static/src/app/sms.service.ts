import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SMSService {
  private smsUrl = '/sms/';


  constructor(private http: HttpClient) {
  }

  sendSMS(cellphone: string): Promise<any> {
    let url = this.smsUrl + 'send/' + cellphone;
    return this.http
      .get(url)
      .toPromise()
      .catch(SMSService.handleError);
  }

  verifySMS(cellphone: string, code: string): Promise<any> {
    let url = this.smsUrl + 'verify/';
    let params = new HttpParams()
      .set('phone_number', cellphone)
      .set('code', code);
    return this.http
      .get(url, {params})
      .toPromise()
      .catch(SMSService.handleError);
  }

  private static handleError(error: any) {
    console.error(error);
    return Promise.reject(error._body);
  }
}
