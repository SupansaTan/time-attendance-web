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

  getEmployees(): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees`
    return this.http.get<Array<EmployeeModel>>(url)
  }

  editEmployee(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/employees`
    return this.http.put(url , val)
  } 

  getDepartment(): Observable<Array<DepartmentModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/departments`
    return this.http.get<Array<DepartmentModel>>(url)
  }
  
  editDepartment(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/departments`
    return this.http.put(url , val)
  } 

  getShiftCode(): Observable<Array<ShiftCodeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/shiftcode`
    return this.http.get<Array<ShiftCodeModel>>(url)
  }

  getTimeRecord(): Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord`
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  getPlanShift(): Observable<Array<PlanShiftModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift`
    return this.http.get<Array<PlanShiftModel>>(url)
  }

  editPlanShift(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/departments`
    return this.http.put(url , val)
  }

  addPlanShift(val:any){
    const url = `${environment.apiTimeAttendanceUrl}/api/planshift`
    return this.http.post(url , val)
  }

}