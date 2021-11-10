import { Component, OnInit } from '@angular/core';
import { ChildrenItem, MenuItems } from 'src/app/model/menu-items.model';
import { DepartmentService } from '../../../service/department.service'
import navigation from '../menu-items';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  path: Array<string>
  menu: MenuItems | any
  menuChild: Array<ChildrenItem> | any = []

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.path = location.pathname.split("/")
    this.menu = navigation.items.find((item) => item.url == '/' + this.path[1])

    // department detail path
    if(this.path.length > 2) {
      if(this.path[1] == 'dashboard' || 'assign-plan') {
        this.menuChild.push(
          {
            url: location.pathname,
            title: this.departmentService.getDepartmentName(Number(this.path[2]))
          }
        )
      }
    }
  }

}
