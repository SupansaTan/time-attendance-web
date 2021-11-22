import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/localStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role: string;
  token: string;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.role = this.localStorageService.get<string>('role')!
  }
}
