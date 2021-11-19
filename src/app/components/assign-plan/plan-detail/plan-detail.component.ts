import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { EmployeeModel } from 'src/app/model/employee.model';
import { DepartmentModel } from 'src/app/model/department.model';
import { ShiftCodeModel, PlanShiftModel } from 'src/app/model/shift.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { NgOption } from "@ng-select/ng-select";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  departmentId: number
  today: Date
  date: Date | string;
  employees: Array<EmployeeModel> = new Array<EmployeeModel>();
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
  filter: FormControl = new FormControl('');
  filter_select = {
    shift: 'All',
    ot: 'All',
    type: 'All'
  }
  shift_option: NgOption[] = [
    { id: 0, value: 'All'}
  ]
  ot_option: NgOption[] = [
    { id: 0, value: 'All'}
  ]
  type_option: NgOption[] = [
    { id: 0, value: 'All'},
    { id: 1, value: 'Daily'},
    { id: 2, value: 'Monthly'}
  ]

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
    this.date = this.today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.otBtnActive, this.shiftBtnActive = false
    this.departmentId = Number(location.pathname.split("/")[2])

    /* get data */
    this.shiftService.getDepartmentInfo(this.departmentId).subscribe((response) => {
      this.department = response[0]})

    this.shiftService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      if (response[0]) {
        this.planshifts = response}
    })

    this.shiftService.getShiftCode().subscribe((response) => {
      this.shiftcode = response})

    /* add checked property for checkbox */
    this.planshifts.map((planshift) => planshift.checked = false)
    this.shiftService.getDepEmployee(this.departmentId).subscribe((response) => {
      this.employees = response})
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
  
  add_planshift(){
    var val = {
      "department": [this.departmentId],
      "employee_list": [1],
      "overtime": this.ot,
      "start_date": this.start_date,
      "end_date": this.end_date,
      "start_time": this.shift
    }
    this.shiftService.addPlanshift(val).subscribe(res=>{
      alert(res.toString());
    })
  }

  onSubmit()
  {
    this.add_planshift();
    console.warn(this.assign_form.value);
  }

  get start_date() {
    return this.assign_form.get('start_date')!.value
  }
  get end_date() {
    return this.assign_form.get('end_date')!.value
  }
  get shift() {
    return this.assign_form.get('shift')!.value
  }
  get ot() {
    return this.assign_form.get('ot')!.value
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

}
