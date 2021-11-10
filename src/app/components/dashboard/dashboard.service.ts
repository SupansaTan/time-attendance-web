import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EmployeeModel } from '../../model/employee.model'
import { Departments } from '../../mock-department'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDepartmentName(id: number) {
    return Departments.find(department => department.id == id)?.name
  }

  getPercentage(actual: number, total: number) {
    return actual * 100 / total
  }

  getEmployees(): Observable<Array<EmployeeModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/employees`
    return this.http.get<Array<EmployeeModel>>(url)
  }
}
