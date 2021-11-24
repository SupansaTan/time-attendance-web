import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {TimeRecordModel} from 'src/app/model/timerecord.model';


@Injectable({
  providedIn: 'root'
})
export class CardRegisterService {

  constructor(private http: HttpClient) { }

  //get employee timerecord
  getTimeRecord(id: number) : Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/employee/` + id
    return this.http.get<Array<TimeRecordModel>>(url)
  }

  getActiveEmployee(id: number, shift: string) : Observable<Array<TimeRecordModel>> {
    const url = `${environment.apiTimeAttendanceUrl}/api/timerecord/department/` + id + '/' + shift
    return this.http.get<Array<TimeRecordModel>>(url)
  }

}
