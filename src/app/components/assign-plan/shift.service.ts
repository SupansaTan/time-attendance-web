import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import { EmployeeModel } from '../../model/employee.model'
import { DepartmentModel } from 'src/app/model/department.model';
import { ShiftCodeModel,PlanShiftModel } from 'src/app/model/shift.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http:HttpClient) { }

  // get department by department id
  getDepartment(val:any): Observable<Array<DepartmentModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/departments/`+ val
    return this.http.get<Array<DepartmentModel>>(url)
  }

  // get all shift
  getShiftCode(): Observable<Array<ShiftCodeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/shiftcode`
    return this.http.get<Array<ShiftCodeModel>>(url)
  }

  // get plan by department id
  getDepPlanShift(dep_id:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/department/`+ dep_id
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  getTodayDepPlanShift(dep_id:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/department/today/` + dep_id
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  getManagerInfo(id:number): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees/` + id
    return this.http.get<Array<EmployeeModel>>(url)
  }

  // val = {data}
  addPlanshift(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/new`
    return this.http.post(url, val)
  } 


  getPercentage(actual: number, total: number) {
    return Math.round(actual * 100 / total)
  }

  // get time record by date 
  getTimerecordByDepartment(dep_id:any): Observable<Array<TimeRecordModel>>{
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/department/`+ dep_id
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  getTimerecordByEmp(emp_id:any): Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/employee/`+ emp_id
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  // get plan by department id
  getEmpPlanShift(val:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/employee/`+ val
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  // get employee by employee id
  getEmployee(id:any): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/dashboard/`+ id
    return this.http.get<Array<EmployeeModel>>(url)
  }


}