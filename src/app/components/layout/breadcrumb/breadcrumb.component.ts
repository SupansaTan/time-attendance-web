import { Component, OnInit } from '@angular/core';
import { ChildrenItem, MenuItems } from 'src/app/model/menu-items.model';
import { DepartmentService } from '../../../service/department.service'
import navigation from '../menu-items';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  current_path: Array<string>
  menu: MenuItems | any
  menuChild: Array<ChildrenItem> | any = []
  title: string

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart){
        location.pathname == '/'? this.current_path = '/dashboard'.split('/') : this.current_path = event.url.split("/"); // config current path
        this.menu = navigation.items.find((item) => item.url == '/' + this.current_path[1])

        // department detail path
        this.current_path.length > 2 ? this.addMenuChild() : false
      }
    })
  }

  addMenuChild() {
    if(this.current_path[1] == 'dashboard' || 'assign-plan') {

      this.departmentService.getDepartmentInfo(Number(this.current_path[2])).subscribe(
        (data) => {
          this.menuChild.push(
            {
              url: location.pathname,
              title:  data[0].name
            }
          )
        }
      )

    }
  }
}
