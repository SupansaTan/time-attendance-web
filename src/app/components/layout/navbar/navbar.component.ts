import { Component, OnInit, HostListener } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  showNavRight: boolean;
  public screenWidth: any;

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {
}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.showNavRight = !(this.screenWidth < 992)
    this.username = 'สมหญิง รักสมชาย'
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.showNavRight = !(this.screenWidth < 992)
  }
  
}
