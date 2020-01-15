import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {NgForm} from '@angular/forms';
import {MessageService} from '../../service/message.service';
import {Notice} from '../../entity/notice';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Resp} from '../../entity/resp';
import {User} from '../../entity/user';
import {UtilsService} from '../../service/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readyLoad = false;
  pageStatus = {
    isLogin: true,
    accountNotice: '没有账号，去注册',
    buttonText: '登录',
  };

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    private cookieService: CookieService,
    private utils: UtilsService
  ) {
  }

  ngOnInit() {
    this.tryAutoLogin();
  }

  genComplex(password: string): string {
    if (!password) {
      return '0%';
    }
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasSpecial = false;
    let hasNumber = false;
    for (const p of password) {
      if (!hasUpperCase) {
        hasUpperCase = p === p.toUpperCase() && p !== p.toLowerCase();
      }
      if (!hasLowerCase) {
        hasLowerCase = p === p.toLowerCase() && p !== p.toUpperCase();
      }
      if (!hasSpecial) {
        hasSpecial = '`~!@#$^&*()=|{}\':;\',[].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？'.indexOf(p) !== -1;
      }
      if (!hasNumber) {
        hasNumber = '0123456789'.indexOf(p) !== -1;
      }
    }

    const code = Number(hasUpperCase) + Number(hasLowerCase) + Number(hasSpecial) + Number(hasNumber);
    const length = password.length;
    const complex = code * .6667 + Math.min(2, length / 4);

    const percent = Math.min(25 * complex, 100);
    return `${percent}%`;
  }

  private tryAutoLogin() {
    this.loginService.autoLogin()
      .subscribe(resp => {
        console.log(resp);
        if (resp && resp.code < 200) {
          this.addToken2Cookie(resp);
          this.loginService.loginUser = resp.data;
          this.utils.setLoginUserCache(resp.data);
          this.router.navigateByUrl('auth/admin');
        } else {
          this.readyLoad = true;
        }
      });
  }

  private doLogin(name: string, password: string) {
    this.loginService.login(name, password)
      .subscribe(resp => {
        console.log(resp);
        if (!resp) {
          this.messageService.addNotice(new Notice('请求异常', true));
        } else if (resp.code >= 200) {
          this.messageService.addNotice(new Notice(resp.msg || '请求异常', true));
        } else {
          this.addToken2Cookie(resp);
          this.loginService.loginUser = resp.data;
          this.utils.setLoginUserCache(resp.data);
          this.messageService.addNotice(new Notice(resp.msg || '登录成功'));
          this.router.navigateByUrl('auth/admin');
        }
      });
  }

  private addToken2Cookie(resp: Resp<User>): void {
    this.cookieService.delete('token', '/');
    this.cookieService.set('token', resp.data.token, 30, '/');
  }

  private signUp(name: string, password: string) {
    this.loginService.signUp(name, password)
      .subscribe(resp => {
        console.log(resp);
        if (!resp) {
          this.messageService.addNotice(new Notice('请求异常', true));
        } else if (resp.code >= 200) {
          this.messageService.addNotice(new Notice(resp.msg || '请求异常', true));
        } else {
          this.messageService.addNotice(new Notice(resp.msg || '注册成功'));
          this.doLogin(name, password);
        }
      });
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      if (this.pageStatus.isLogin) {
        this.doLogin(loginForm.value.name, loginForm.value.password);
      } else {
        this.signUp(loginForm.value.name, loginForm.value.password);
      }
    } else {
      this.messageService.addNotice(new Notice('请输入用户名和密码', true));
    }
  }

  changPage() {
    if (this.pageStatus.isLogin) {
      this.pageStatus = {
        isLogin: false,
        accountNotice: '已有账号，去登录',
        buttonText: '注册',
      };
    } else {
      this.pageStatus = {
        isLogin: true,
        accountNotice: '没有账号，去注册',
        buttonText: '登录',
      };
    }
  }
}
