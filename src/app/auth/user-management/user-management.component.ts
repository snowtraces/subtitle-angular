import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {User} from '../../entity/user';
import {FormControl} from '@angular/forms';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {UserService} from '../../service/user.service';
import {MessageService} from '../../service/message.service';
import {Notice} from '../../entity/notice';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-user-management',
  styleUrls: ['user-management.component.css'],
  templateUrl: 'user-management.component.html',
})
export class UserManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'status'];
  data: User[] = [];
  filter: FormControl = new FormControl();
  filterValue: string;

  resultsLength = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.filter.valueChanges.subscribe(value => {
      this.paginator.pageIndex = 0;
      this.filterValue = value;
    });

    merge(this.sort.sortChange, this.paginator.page, this.filter.valueChanges)
      .pipe(
        debounceTime(1000),
        startWith({}),
        switchMap(() => {
          return this.userService.list4Page(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filter.value);
        }),
        map(data => {
          this.resultsLength = data.total;
          return data.rows;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  changeStatus($event: MatSlideToggleChange, id: string) {
    console.log($event.checked, id);
    // TODO 发送请求更改状态
    this.userService.changeStatus($event.checked, id).subscribe(resp => {
      console.log(resp);
      if (!resp || resp.code >= 200) {
        this.messageService.addNotice(new Notice('修改失败', true));
      } else {
        this.messageService.addNotice(new Notice('修改成功'));
      }
    });
  }
}
