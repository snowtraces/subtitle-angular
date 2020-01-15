import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UtilsService} from '../service/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
    private utils: UtilsService
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.router.navigateByUrl('auth/login');
    this.utils.setLoginUserCache(null);
    this.loginService.loginUser = null;
  }
}
