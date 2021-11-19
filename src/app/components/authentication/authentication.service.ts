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
  
  
  //ประกาศเรียกใช้ service ไม่ก็ module 
  constructor(private http:HttpClient) {}

  //ngOnInit ประกาศค่าเริ่มต้นให้กับตัวแปร def init()
  ngOnInit(): void{
    
  }

  getAllEmployee(): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees`
    return this.http.get<Array<EmployeeModel>>(url)
  }

  //emp คือตัวเก็บไว้ใช้ฟิลเตอร์
  getUser(all_employee: Array<any>,email: string, password: string){
    this.all_employee = all_employee
    this.user = all_employee.filter((emp) => emp.email == email && emp.password == password )[0]
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
    return this.user.role
  }


  getUserid(){
    return this.user.id
  }
}

