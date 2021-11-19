import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { EmployeeModel } from 'src/app/model/employee.model';
import { DepartmentModel } from 'src/app/model/department.model';
import { ShiftCodeModel, PlanShiftModel } from 'src/app/model/shift.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { NgOption } from "@ng-select/ng-select";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { shiftOptions, otOptions, typeOptions } from './filter-options';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  departmentId: number
  today: Date
  date: Date | string;
  all_employees: Array<EmployeeModel> = new Array<EmployeeModel>(); // for keep
  employees: Array<EmployeeModel> = new Array<EmployeeModel>(); // for show
  department: DepartmentModel = <DepartmentModel>{};
  shiftcode: Array<ShiftCodeModel> = new Array<ShiftCodeModel>();
  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>();
  timerecord: Array<TimeRecordModel> = new Array<TimeRecordModel>();
  emp_plan: PlanShiftModel = new PlanShiftModel()
  emp_select: Array<{id: number}>  // employees selected by checkbox

  page: any;
  pageSize: any;
  table_option: NgOption[]
  isAllChecked: boolean = false
  countSelected: number = 0

  /* assign group */
  mode: Array<string> = []
  otBtnActive: boolean
  shiftBtnActive: boolean
  ot_plan: number = 0
  assign_form = new FormGroup({
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    shift: new FormControl(''),
    ot: new FormControl('')
  });

  /* filter group over table */
  name_filter: string;
  filter_select = {
    date: '',
    shift: 'All',
    ot: 'All',
    type: 'All'
  }
  shift_option: NgOption[] = shiftOptions
  ot_option: NgOption[] = otOptions
  type_option: NgOption[] = typeOptions

  constructor(private shiftService:ShiftService) { }

  ngOnInit(): void {
    this.assign_form = new FormGroup({
      start_date: new FormControl('',[Validators.required]),
      end_date: new FormControl('',[Validators.required]),
      shift: new FormControl('',[Validators.required]),
      ot: new FormControl('',[Validators.required])
    });

    this.page = 1
    this.pageSize = 10  // row of each page table
    this.table_option = [
      { value: 2 },
      { value: 5 },
      { value: 10 }
    ];
    this.today = new Date();
    this.date = this.localeDateFormat(this.today)

    this.otBtnActive, this.shiftBtnActive = false
    this.departmentId = Number(location.pathname.split("/")[2])

    /* get data */
    this.shiftService.getDepartmentInfo(this.departmentId).subscribe((response) => {
      this.department = response[0]
    })
    this.shiftService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      if (response[0]) {
        this.planshifts = response
      }
    })
    this.shiftService.getShiftCode().subscribe((response) => {
      this.shiftcode = response
    })

    /* add checked property for checkbox */
    this.planshifts.map((planshift) => planshift.checked = false)
    this.shiftService.getDepEmployee(this.departmentId).subscribe((response) => {
      this.employees = this.all_employees = response
    })
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.shiftService.getPercentage(actual_emp, total_emp)
  }

  findPlanshift(emp_id:any){
    this.emp_plan = new PlanShiftModel()
    let plan = this.planshifts.filter(element => element.employee[0].id == emp_id)[0]
    plan? this.emp_plan = plan : false
    return this.emp_plan
  }

  addPlanshift(){
    var val = {
      "department": [this.departmentId],
      "employee_list": [1],
      "overtime": this.assign_form.controls['ot'].value,
      "start_date": this.assign_form.controls['start_date'].value,
      "end_date": this.assign_form.controls['end_date'].value,
      "start_time": this.assign_form.controls['shift'].value
    }
    this.shiftService.addPlanshift(val).subscribe(res=>{
      alert(res.toString());
    })
  }

  setAssignMode(selectMode: string) {
    selectMode === 'shift'
      ? this.shiftBtnActive = !this.shiftBtnActive
      : this.otBtnActive = !this.otBtnActive

    if(this.mode.includes(selectMode)) {
      this.mode.splice(this.mode.indexOf(selectMode), 1); // remove if exist
    }
    else {
      this.mode.push(selectMode)
    }
  }

  setAllSelected() {
    this.employees.map((employee) => employee.checked = this.isAllChecked)
    this.updateEmployeeSelected()
  }

  updateEmployeeSelected() {
    this.countSelected = this.employees.filter((employee) => employee.checked == true).length
  }

  getEmployeeSelected() {
    let emp_checked = this.employees.filter((employee) => employee.checked == true)
    emp_checked.map((emp) => {
      this.emp_select.push({id: emp.id})
    })
  }

  localeDateFormat(date: Date) {
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }

  convertDateFormat(date_input: string) {
    // convert to `YYYY-MM-DD`
    let date = new Date(date_input)
    return date.toISOString().split('T')[0]
  }

  /* filter group */
  filterEmployeeType(option: string) {
    if(option === 'All') {
      this.employees = this.all_employees
    }
    else {
      this.employees = this.all_employees.filter((emp) =>
        (emp.employee_type == option.toLowerCase())
      )
    }
  }

  filterEmployeeName(terms: string) {
    this.name_filter = terms

    if(this.name_filter == '') {
      this.employees = this.all_employees
    }
    else {
      this.employees = this.all_employees.filter((emp) => (
        emp.first_name.includes(this.name_filter.toLowerCase()) ||
        emp.last_name.includes(this.name_filter.toLowerCase())
      ))
    }
  }

  filterOTPlan(option: string) {
    if(option === 'All') {
      this.employees = this.all_employees
    }
    else {

    }
  }

  filterShift(option: string) {
    if(option === 'All') {
      this.employees = this.all_employees
    }
    else {

    }
  }
}
