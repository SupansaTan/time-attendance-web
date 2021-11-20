import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import{HttpClient} from '@angular/common/http';

import { EmployeeModel } from 'src/app/model/employee.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  //ประกาศ type ตัวแปรก่อนใช้
  all_employee: Array<EmployeeModel> = new Array<EmployeeModel>() //ประกาศ type
  user : EmployeeModel = new EmployeeModel();
  email : string;
  password : string;

  private role = localStorage.getItem('UserRole') || ''
  private id = localStorage.getItem('UserID') || ''
  
  
  //ประกาศเรียกใช้ service ไม่ก็ module 
  constructor(private http:HttpClient) {}

  getAllEmployee(): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees`
    return this.http.get<Array<EmployeeModel>>(url)
  }

  //emp คือตัวเก็บไว้ใช้ฟิลเตอร์
  getUser(all_employee: Array<any>,email: string, password: string){
    this.role = localStorage.getItem('UserRole') || ''
    this.id = localStorage.getItem('UserID') || ''

    this.all_employee = all_employee
    this.user = all_employee.filter((emp) => emp.email == email && emp.password == password )[0]
    localStorage.setItem('UserRole', this.user.role)
    localStorage.setItem('UserID', (this.user.id).toString())
    
    return this.user
  }

  getEmail(email: string){
    this.email = this.all_employee.filter((emp) => emp.email == email )[0].email
    return this.email
  }

  getPassword(password: string){
    this.password = this.all_employee.filter((emp) => emp.password == password )[0].password
    return this.password
  }

  getUserRole(){
    console.log('service role ',this.role)
    return this.role
  }


  getUserid(){
    console.log('service id ',this.id)
    return Number(this.id)
  }

  logout(){
    localStorage.clear()
  }

  /* Note (Sample email for login)
    email for manager: 5@gmail.com 
    pass: 0005

    email for employee: 1@gmail.com 
    pass: 0001
  */

}

