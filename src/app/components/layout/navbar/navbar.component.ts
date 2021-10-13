import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;

  constructor() { }

  ngOnInit(): void {
    this.username = 'สมหญิง รักสมชาย'
  }

}
