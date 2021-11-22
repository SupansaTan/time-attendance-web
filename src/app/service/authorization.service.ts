import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from 'src/app/service/localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly headers = new Headers({'Content-Type': 'application/json'});
  private isLogin: BehaviorSubject<boolean>;

  constructor(private http:HttpClient, private localStorageService: LocalStorageService) {
    const accessToken = this.localStorageService.get<string>('accessToken');
    if (accessToken) {
      this.isLogin = new BehaviorSubject<boolean>(true);
    }
    else {
      this.isLogin = new BehaviorSubject<boolean>(false);
    }
  }

  getLoginStatus(): BehaviorSubject<boolean> {
    if (this.isLogin.getValue()) {
      const accessToken = this.localStorageService.get<string>('accessToken');
      if (accessToken) {
        this.isLogin.next(true);
      }
      else {
        this.isLogin.next(false);
      }
    }
    return this.isLogin;
  }

  setLoginStatus(status: boolean) {
    this.isLogin.next(status);
  }

}
