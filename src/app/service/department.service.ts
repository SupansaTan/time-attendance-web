import { Injectable } from '@angular/core';
import { Departments } from '../mock-department'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartmentName(id: number) {
    return Departments.find(department => department.id == id)?.name
  }

  getDepartment(id: number) {
    return Departments.find(department => department.id == id)
  }

  getDepartments() {
    return Departments
  }
}
