import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EmployeeModel } from '../../model/employee.model'

import { DepartmentModel } from 'src/app/model/department.model';
import { PlanShiftModel } from 'src/app/model/shift.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { ShiftCodeModel } from 'src/app/model/shift.model';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDepartmentInfo(id: number) {
    const url = `${environment.apiTimeAttendanceUrl}/api/departments/` + id
    return this.http.get<Array<DepartmentModel>>(url)
  }

  getPercentage(actual: number, total: number) {
    return Math.round(actual * 100 / total)
  }

  getEmployeeInfo(id:number): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees/` + id
    return this.http.get<Array<EmployeeModel>>(url)
  }

  // get all employee of department
  getDepEmployee(dep_id:any): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees/department/` + dep_id
    return this.http.get<Array<EmployeeModel>>(url)
  }

  // get all plan in department
  getDepPlanShift(dep_id:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/department/` + dep_id
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  getTodayDepPlanShift(dep_id:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/department/today/` + dep_id
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  // get all plan of an employee
  getEmpPlanShift(dep_id:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/employee/` + dep_id
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  getTodayEmpPlanShift(emp_id:any): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/employee/today/` + emp_id
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  getTodayDepTimerecord(dep_id:any): Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/department/` + dep_id
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  getTodayEmpTimerecord(emp_id:any): Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/employee/` + emp_id
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  getAllShiftcode(): Observable<Array<ShiftCodeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/shiftcode`
    return this.http.get<Array<ShiftCodeModel>>(url)
  }

  add_timerecord(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/new`
    return this.http.post(url,val)
  }

  increase_active_emp(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/departments/action`
    return this.http.put(url,val)
  }

  decrease_active_emp(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/departments/action`
    return this.http.put(url,val)
  }

}
