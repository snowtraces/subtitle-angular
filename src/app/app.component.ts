import {Component, OnInit} from '@angular/core';
import {UtilsService} from './service/utils.service';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private utils: UtilsService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.loginService.loginUser = this.utils.getLoginUserCache();
  }
}
