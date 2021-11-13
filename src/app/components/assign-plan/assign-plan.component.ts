import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from 'src/app/model/department.model';
import { PlanShiftModel,ShiftCodeModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { ShiftService } from './shift.service';


@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.scss']
})
export class AssignPlanComponent implements OnInit {

  employees: Array<EmployeeModel> = new Array<EmployeeModel>()
  departments: Array<DepartmentModel> = new Array<DepartmentModel>()

  constructor(private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.shiftService.getallDepartments().subscribe((response) => {
      this.departments = response})
  }
}
