import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  path: string

  constructor() {
    this.path = location.pathname.split("/")[1]
  }
}
