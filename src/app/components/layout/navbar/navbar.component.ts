import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  showNavRight: boolean;
  public screenWidth: any;

  constructor(private router: Router, private socialAuthService: SocialAuthService) { }

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
  logout(): void {
    this.socialAuthService.signOut().then(() => this.router.navigate(['/auth/login']));
  }
}
