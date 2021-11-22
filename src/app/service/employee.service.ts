import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { EmployeeModel } from 'src/app/model/employee.model';
import {TimeRecordModel} from 'src/app/model/timerecord.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  /* get all employees by department id  */
  getEmployees(dep_id:any): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees/department/` + dep_id
    return this.http.get<Array<EmployeeModel>>(url)
  }

  /* get employee info by employee id */
  getEmployee(id: any): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees/`+ id
    return this.http.get<Array<EmployeeModel>>(url)
  }
  
  //get employee timerecord
  getTimeRecord(id:any) : Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/employee/` + id
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  //get ot
  getOT(id:any) : Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/employee/` + id
    return this.http.get<Array<EmployeeModel>>(url)
  }

  //get shift
  getShift(id:any) : Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/employee/today/` + id
    return this.http.get<Array<EmployeeModel>>(url)
  }

}
