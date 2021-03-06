import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeModel } from 'src/app/model/employee.model';
import { DepartmentModel } from 'src/app/model/department.model';
import { ShiftCodeModel, PlanShiftModel } from 'src/app/model/shift.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { NgOption } from "@ng-select/ng-select";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { typeOptions } from './filter-options';
import { blueTheme } from './timepicker-theme';
import { NgxSpinnerService } from "ngx-spinner";
import { CardRegisterService } from 'src/app/service/card-register.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  departmentId: number
  today: Date
  date: string;
  all_employees: Array<EmployeeModel> = new Array<EmployeeModel>(); // for keep
  employees: Array<EmployeeModel> = new Array<EmployeeModel>(); // for show
  department: DepartmentModel = <DepartmentModel>{};
  shiftcode: Array<ShiftCodeModel> = new Array<ShiftCodeModel>();
  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>();
  timerecord: Array<TimeRecordModel> = new Array<TimeRecordModel>();
  emp_plan: PlanShiftModel = new PlanShiftModel()
  emp_select: Array<number> = []  // employees selected by checkbox
  current_shift: Array<PlanShiftModel>
  active_emp: number = 0

  page: any;
  pageSize: any;
  date_option: Array<string> = []
  table_option: NgOption[]
  isToday: boolean = true
  isAllChecked: boolean = false
  countSelected: number = 0

  /* assign group */
  mode: Array<string> = []
  otBtnActive: boolean
  shiftBtnActive: boolean
  minDate: string
  minEndDate: string
  timepickerTheme = blueTheme
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
    type: 'All'
  }
  type_option: Array<any> = typeOptions

  constructor(
    private shiftService: ShiftService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private spinner: NgxSpinnerService,
    private cardRegisterService: CardRegisterService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.today = new Date();
    const offset = this.today.getTimezoneOffset()
    this.today = new Date(this.today.getTime() - (offset*60*1000))
    this.date = this.localeDateFormat(this.today)

    this.departmentId = Number(location.pathname.split("/")[2])
    this.initAssignForm()
    this.initDepartmentInfo()
    this.initTable()
  }

  initDepartmentInfo() {
    this.departmentService.getDepartmentInfo(this.departmentId).subscribe((response) => {
      this.department = response[0]
    })
    this.shiftService.getShiftCode().subscribe((response) => {
      this.shiftcode = response
    })
  }

  initAssignForm() {
    this.mode = []
    this.otBtnActive = false
    this.shiftBtnActive = false
    this.minDate = this.today.toISOString().split("T")[0]
    this.minEndDate = this.today.toISOString().split("T")[0]
    this.assign_form = new FormGroup({
      start_date: new FormControl(this.today.toISOString().split("T")[0],[Validators.required]),
      end_date: new FormControl(this.today.toISOString().split("T")[0],[Validators.required]),
      shift: new FormControl(''),
      ot: new FormControl('0',[Validators.required])
    });
  }

  initTable() {
    this.page = 1
    this.pageSize = 10  // row of each page table
    this.table_option = [
      { value: 5 },
      { value: 10 },
      { value: 15 }
    ];

    // default table is today plan
    this.filter_select.date = this.date
    this.date_option.push(this.date)
    this.shiftService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      if (response[0]) {
        this.planshifts = response
        this.findNowShift()
      }
      this.getEmployees()
    })
  }

  updateTable(date: string) {
    this.page = 1
    this.filter_select.date = date
    this.filter_select.date === this.date? this.isToday = true: this.isToday = false
    this.shiftService.getDepPlanShift(this.departmentId).subscribe((response) => {
      if (response[0]) {
        this.planshifts = response
        this.planshifts = this.planshifts.filter(plan => plan.date === this.convertDateFormat(date))
        this.isToday? this.findNowShift(): ''
      }
      this.getEmployees()
    })
  }

  setDateSelect(start: string, end: string) {
    let currentDateSelect = this.filter_select.date
    let startDate = new Date(start)
    let endDate = new Date(end)
    this.minEndDate = startDate.toISOString().split("T")[0]
    this.date_option = []

    // when select date invalid
    if(startDate > endDate) {
      endDate = new Date(this.minEndDate)
      this.assign_form.controls['end_date'].setValue(this.minEndDate)
    }

    // add to date option
    while(startDate <= endDate) {
      this.date_option.push(this.localeDateFormat(startDate))
      startDate.setDate(startDate.getDate() + 1)
    }

    this.filter_select.date = this.date_option[0]
    if(currentDateSelect != this.filter_select.date) {
      this.updateTable(this.filter_select.date)
    }
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.shiftService.getPercentage(actual_emp, total_emp)
  }

  findEmployeePlan(emp_id: number) {
    return this.planshifts.filter(element => element.employee[0].id == emp_id)[0]
  }

  addPlanshift(){
    this.getEmployeeSelected()
    if (this.countSelected==0){
      alert('Select Employee to assign plan')
    }
    else{
      var val = {}
      if(this.otBtnActive && this.shiftBtnActive){
        val = {
              "department": [this.departmentId],
              "employee_list": this.emp_select,
              "overtime": this.assign_form.controls['ot'].value,
              "start_date": this.assign_form.controls['start_date'].value,
              "end_date": this.assign_form.controls['end_date'].value,
              "start_time": this.assign_form.controls['shift'].value + ':00'
              }
      }
      else if(this.otBtnActive){
        val = {
              "department": [this.departmentId],
              "employee_list": this.emp_select,
              "overtime": this.assign_form.controls['ot'].value,
              "start_date": this.assign_form.controls['start_date'].value,
              "end_date": this.assign_form.controls['end_date'].value,
              }
      }
      else if(this.shiftBtnActive){
        val = {
              "department": [this.departmentId],
              "employee_list": this.emp_select,
              "start_date": this.assign_form.controls['start_date'].value,
              "end_date": this.assign_form.controls['end_date'].value,
              "start_time": this.assign_form.controls['shift'].value + ':00'
              }
      }

      this.shiftService.addPlanshift(val).subscribe(
        (res) => {
          alert(res.toString())
          this.filter_select.date = this.date_option[0]
          this.updateTable(this.date_option[0])
          this.initAssignForm()
          this.clearAllSelected()
        },
        (err) => alert('Can not add assign plan')
      )
    }
  }

  deletePlanshift(){
    this.getEmployeeSelected()
    if (this.countSelected==0){
      alert('Select Employee to remove plan')
    }
    else{
      this.emp_select.forEach((emp_id) => {
        let plan = this.planshifts.filter((plan) => plan.date == this.date_option[0].split("/").reverse().join("-") && plan.employee[0].id == emp_id)[0]
        if (plan){
          this.shiftService.deletePlanshift(plan.id).subscribe(
            (res) => {
              console.warn(res.toString())
              this.filter_select.date = this.date_option[0]
              this.updateTable(this.date_option[0])
              this.initAssignForm()
              this.clearAllSelected()
            },
            (err) => alert('Can not remove assign plan')
          )
        }
      })
    }

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

  /* get employees for table */
  getEmployees() {
    this.employeeService.getEmployees(this.departmentId).subscribe((response) => {
      this.employees = this.all_employees = response
      this.employees.map((employee) => {
        employee.checked = this.emp_select.includes(employee.id)

        let plan = this.findEmployeePlan(employee.id)
        if(plan) {
          employee.start_time = plan.start_time.slice(0,5)
          employee.end_time = plan.end_time.slice(0,5)
          employee.overtime = plan.overtime
          this.getEmpTimeRecord(employee.id)
        }
      })

      /* sort employee that has plan to on top of array */
      let employeeHasPlan = this.employees.filter(emp => emp.start_time)
      employeeHasPlan.sort(function(a,b){
        var t1 = a.start_time!;
        var t2 = b.start_time!;
        return t1<t2 ? 1 : t1>t2 ? -1 : 0;
      });
      employeeHasPlan.map(emp => {
        this.employees.splice(this.employees.indexOf(emp), 1)
        this.employees.unshift(emp)
      })

      this.spinner.hide()
    })
  }

  getEmpTimeRecord(id: number) {
    let cardRegis: TimeRecordModel
    this.cardRegisterService.getTimeRecord(id).subscribe((res) => {
      cardRegis = res[0]
      let emp = this.employees.filter(emp => emp.id === id)[0]
      emp.start_work = (cardRegis && cardRegis.time)? true:false
    })
  }

  findNowShift() {
    let allShifts: Array<string> = []
    let now = this.today.getHours() + ':' + this.today.getMinutes()
    this.planshifts.map((plan) => { allShifts.push(plan.start_time) })
    this.active_emp = 0
    allShifts.push(now)

    allShifts.sort(function(a, b) {
      return Date.parse('1970/01/01 ' + a) - Date.parse('1970/01/01 ' + b)  // sort shift
    });
    let index = allShifts.indexOf(now)<0? allShifts.length-2: allShifts.indexOf(now)==0? 1: allShifts.indexOf(now)-1
    this.current_shift = this.planshifts.filter((plan) => plan.start_time === allShifts[index])

    this.cardRegisterService.getActiveEmployee(this.departmentId, this.current_shift[0].start_time).subscribe(res => {
      if(res.length > 0) {
        this.active_emp = res.length
      }
    })
  }

  /* select box */
  setAllSelected() {
    this.employees.map((employee) => employee.checked = this.isAllChecked)
    this.getEmployeeSelected()
  }

  clearAllSelected() {
    this.emp_select = []
    this.employees.map((employee) => employee.checked = false)
    this.isAllChecked = false
    this.getEmployeeSelected()
  }

  getEmployeeSelected() {
    this.emp_select = []
    let emp_checked = this.employees.filter((employee) => employee.checked == true)
    this.countSelected = emp_checked.length

    emp_checked.map((emp) => {
      this.emp_select.push(emp.id)
    })
  }

  /* date format */
  localeDateFormat(date: Date) {
    function pad(s: number) { return (s < 10) ? '0' + s : s; }
    let d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  convertDateFormat(date_input: string) {
    // convert to `YYYY-MM-DD`
    const [day, month, year] = date_input.split("/")
    let date = new Date(Number(year), Number(month) - 1, Number(day))
    function pad(s: number) { return (s < 10) ? '0' + s : s; }
    return [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join('-')
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

  filterEmployee(terms: string) {
    this.name_filter = terms

    if(this.name_filter == '') {
      this.employees = this.all_employees
    }
    else {
      this.employees = this.all_employees.filter((emp) => (
        emp.first_name.includes(this.name_filter.toLowerCase()) ||
        emp.last_name.includes(this.name_filter.toLowerCase()) ||
        emp.overtime == Number(terms) ||
        emp.start_time?.includes(terms) ||
        emp.employee_type.includes(terms)
      ))
    }
  }
}
