import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItems } from 'src/app/model/menu-items.model';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import navigation from '../menu-items';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  menus: Array<MenuItems>
  navCollapsed: boolean
  menuCollapsed: boolean
  role: string
  token: string
  public screenWidth: any;

  constructor(private authService: AuthenticationService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.menus = navigation.items
    this.screenWidth = window.innerWidth;
    this.menuCollapsed = false;

    this.token = this.localStorageService.get<string>('accessToken')!
    if(this.token) {
      this.authService.getCurrentUserRole(this.token).subscribe(res => {
        this.role = res.data.role
        this.role == 'employee'? this.menus.pop() : false  // not show assign plan when user is employee
      })
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
