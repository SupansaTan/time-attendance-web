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
  date: Date | string;
  employees: Array<EmployeeModel> = new Array<EmployeeModel>();
  department: DepartmentModel = new DepartmentModel();
  shiftcode: Array<ShiftCodeModel> = new Array<ShiftCodeModel>();
  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>();
  timerecord: Array<TimeRecordModel> = new Array<TimeRecordModel>();
  page: any;
  pageSize: any;
  table_option: NgOption[];

  start_time_option: NgOption[];
  shift_bt: boolean;
  ot_bt: boolean;
  
    assign_form = new FormGroup({
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    shift: new FormControl(''),
    ot: new FormControl('')
  });
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
    this.date = new Date();
    this.date = this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.departmentId = Number(location.pathname.split("/")[2]) 
    
    this.shiftService.getDepartment(this.departmentId).subscribe((response) => {
      this.department = response[0]})

    this.shiftService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      this.planshifts = response})

    this.shift_bt = false
    this.ot_bt = false

    this.shiftService.getShiftCode().subscribe((response) => {
      this.shiftcode = response})

  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.shiftService.getPercentage(actual_emp, total_emp)
  }

  toggle_shift(){
    // toggle true/false on this.shift_bt
    if (this.shift_bt == false){
      this.shift_bt = true
    }
    else{
      this.shift_bt = false
    }
  }

  toggle_ot(){
    // toggle true/false on this.ot_bt
    if (this.ot_bt == false){
      this.ot_bt = true
    }
    else{
      this.ot_bt = false
    }
  }

  add_planshift(){
    var val = { 
      "department": [this.departmentId],
      "employee_list": ["list_of_empID"],
      "overtime": 0,
      "start_date": "str_date_start",
      "end_date": "str_date_end",
      "start_time": "str_start_time"
    }
    this.shiftService.addPlanshift(val).subscribe(res=>{
      console.log(res.toString());
    })
  }


  onSubmit() 
  {
  console.warn(this.assign_form.value);
  }
  
  get start_date() {
    return this.assign_form.get('ot')!.value
  }
  get end_date() {
    return this.assign_form.get('ot')!.value
  }
  get shift() {
    return this.assign_form.get('ot')!.value
  }
  get ot() {
    return this.assign_form.get('ot')!.value
  }
}
