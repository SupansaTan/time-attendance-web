import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authorizationService: AuthorizationService
  ) { }

  canActivate(): boolean {
    const accessToken = this.localStorageService.get<string>('accessToken');
    const userId = this.localStorageService.get<string>('empId');
    const role = this.localStorageService.get<string>('role')

    if (accessToken && userId && role) {
      return true
    }
    else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
