import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  path: string

  constructor(private router: Router) {

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.path = event.urlAfterRedirects.split("/")[1]
      }
    })
  }
}
