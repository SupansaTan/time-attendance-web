import { Injectable } from '@angular/core';
import { Employees } from '../mock-employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployees() {
    return Employees
  }
}
