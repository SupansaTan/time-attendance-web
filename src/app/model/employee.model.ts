export class EmployeeModel {
  id: number;
  name_title?: string;
  first_name: string;
  last_name: string;
  department:any;
  hire_date?: string;
  employee_type: string;
  role: string;
  email?: string;
  password?: string;
  checked?: boolean;
  start_time?: string | undefined;
  end_time?: string | undefined;
  overtime?: number | undefined;
  start_work?: boolean
  in?: string | undefined;
  out?: string | undefined;
}
