import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItems } from 'src/app/model/menu-items.model';
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
  public screenWidth: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.menus = navigation.items
    this.screenWidth = window.innerWidth;
    this.menuCollapsed = false;
    this.role = this.authService.getUserRole()
    this.role == 'employee'? this.menus.pop() : false  // not show assign plan when user is employee
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
