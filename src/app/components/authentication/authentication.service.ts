import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ConfirmedRegisterModel, LoginModel, ResponseLoginModel, ResponseModel } from 'src/app/model/auth.model';
import { CurrentRoleModel } from 'src/app/model/current-role.model'

//import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  sub: any;

  constructor(private http:HttpClient) {

  }

  /* Note (Sample email for login)
    email for manager: 5@gmail.com
    pass: 0005

    email for employee: 1@gmail.com
    pass: 0001
  */

  login(model: LoginModel): Observable<ResponseLoginModel> {
    const url = `${environment.apiTimeAttendanceUrl}/api/auth/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.sub = this.http.post<ResponseLoginModel>(url, model, { headers: headers });
    return this.sub;
  }

  getCurrentUserRole(token: string): Observable<ResponseModel<CurrentRoleModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/auth/getCurrentUserRole`;
    const headers = new HttpHeaders({ 'Authorization': token });
    this.sub = this.http.get<ResponseModel<CurrentRoleModel>>(url, { headers: headers });
    return this.sub;
  }

  confirmedRegister(model: ConfirmedRegisterModel): Observable<ResponseModel<string>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/auth/confirmedRegister`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.sub = this.http.post<ResponseModel<string>>(url, model, { headers: headers });
    return this.sub;
  }
}

