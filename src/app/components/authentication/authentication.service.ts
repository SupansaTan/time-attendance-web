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
  user : Object;
  email : Object;
  password : Object;
  
  
  //ประกาศเรียกใช้ service ไม่ก็ module 
  constructor(private http:HttpClient) {}

  //ngOnInit ประกาศค่าเริ่มต้นให้กับตัวแปร def init()
  ngOnInit(): void{
    //----------เรียกใช้ใน component
    this.getAllEmployee().subscribe((response)=>{
      this.all_employee = response //ข้อมูลทั้งหมด
    });
    }

  getAllEmployee(): Observable<Array<EmployeeModel>> {
    const url = '${environment.apiTimeAttendanceUrl}/api/employees'
    return this.http.get<Array<EmployeeModel>>(url)
  }

  //emp คือตัวเก็บไว้ใช้ฟิลเตอร์
  getUser(email: string, password: string){
    this.user = this.all_employee.filter((emp) => emp.email == email && emp.password == password )
    return this.user
  }

  getEmail(email: string){
    this.email = this.all_employee.filter((emp) => emp.email == email )
    return this.email
  }

  getPassword(password: string){
    this.password = this.all_employee.filter((emp) => emp.password == password )
    return this.password
  }

  getUserRole(){
  return 'manager'
  }


  getUserid(){
    return 7
  }
}

