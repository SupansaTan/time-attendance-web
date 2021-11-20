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

  // val = {data}
  addPlanshift(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/action`
    return this.http.post(url, val)
  }

  deletePlanshift(plan_id:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift/action/` + plan_id
    return this.http.delete(url)
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

}
