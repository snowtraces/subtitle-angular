import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {NgForm} from '@angular/forms';
import {MessageService} from '../../service/message.service';
import {Notice} from '../../entity/notice';
import {strict} from 'assert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageStatus = {
    isLogin: true,
    accountNotice: '没有账号，去注册',
    buttonText: '登录'
  };

  constructor(
    private loginService: LoginService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
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

  private doLogin(name: string, password: string) {
    this.loginService.login(name, password)
      .subscribe(resp => {
        console.log(resp);
        if (!resp) {
          this.messageService.addNotice(new Notice('请求异常', true));
        } else if (resp.code >= 200) {
          this.messageService.addNotice(new Notice(resp.msg || '请求异常', true));
        } else {
          this.messageService.addNotice(new Notice(resp.msg || '登录成功'));
          // TODO 跳转到管理页面
        }
      });
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
          // TODO 跳转到登陆页面或者直接登录
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
        buttonText: '注册'
      };
    } else {
      this.pageStatus = {
        isLogin: true,
        accountNotice: '没有账号，去注册',
        buttonText: '登录'
      };
    }
  }
}
