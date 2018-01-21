import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import {Registration} from "./registration";
import {Profile} from "./dashboard/profile";

@Injectable()
export class RegisterService {
  private baseUrl = 'api/users/';

  constructor(private http: HttpClient) {
  }

  cellExist(cellphone: string): Observable<any> {
    let url = this.baseUrl + 'cell/';
    return this.http.post(url, {'cellphone': cellphone})
  }

  getAgentName(agentCode: string): Observable<any> {
    let url = this.baseUrl + agentCode;
    return this.http.get<any>(url)
  }

  getProfile(): Observable<Profile> {
    let headers = new HttpHeaders().set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + 'profile/' + sessionStorage.getItem('username');
    return this.http.get<Profile>(url, {headers})
  }

  register(registration: Registration): Observable<Registration> {
    let url = this.baseUrl + 'register/';
    return this.http.post<Registration>(url, registration)
  }

  updateProfile(profile: Profile): Observable<Profile> {
    let headers = new HttpHeaders().set('Authorization', "JWT " + sessionStorage.getItem('token'));
    let url = this.baseUrl + 'profile/' + sessionStorage.getItem("username");
    return this.http.put<Profile>(url, profile, {headers})
  }
}
