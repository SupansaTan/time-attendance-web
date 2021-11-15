import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getUserRole() {
    return 'manager'
  }

  getUserid(){
    return 5
  }
}
