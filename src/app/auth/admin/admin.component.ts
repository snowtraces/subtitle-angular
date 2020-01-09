import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  menus = [
    {
      name: '用户管理',
      active: false,
      target: 'user'
    },
    {
      name: '角色管理',
      active: false,
      target: 'role'
    },
    {
      name: 'API配置',
      active: false,
      target: 'api'
    },
    {
      name: '字幕管理',
      active: false,
      target: 'sub'
    },
  ];


  constructor(
    private route: Router,
  ) {
  }

  ngOnInit() {
    // 通过路径访问，菜单激活状态
    const url = this.route.url;
    this.menus.forEach(menu => {
      menu.active = url.endsWith(menu.target);
    });
  }

  activeMenu(event: MouseEvent) {
    // @ts-ignore
    const id = event.target.id;
    this.menus.forEach(menu => {
      menu.active = menu.name === id;
    });
  }
}
