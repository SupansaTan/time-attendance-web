import { Injectable } from '@angular/core';
import { Employees } from '../mock-employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployee(id: number) {
    return Employees[id]
  }

  getEmployees() {
    return Employees
  }
}
