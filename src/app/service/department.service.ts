import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { DepartmentModel } from 'src/app/model/department.model'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartmentInfo(id: number) {
    const url = `${environment.apiTimeAttendanceUrl}/api/departments/` + id
    return this.http.get<Array<DepartmentModel>>(url)
  }
}
