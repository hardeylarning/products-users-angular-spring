import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user/user.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  message: string = '';
  checkArray!: FormArray;
  ids: number[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group({
      ids: fb.array([]),
    });
  }

  ngOnInit(): void {
    this.message = this.userService.getMessage();
    this.userService.setMessage('');

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    
  }

  protected delete() {
    if (this.checkArray != undefined) {
      this.ids = this.checkArray['value'];
      if (this.ids.length == 0) {
        this.userService.setMessage('Nothing was selected!');
        this.ngOnInit();
        return;
      }
      this.userService.deleteUsers(this.ids).subscribe((data) => {
        this.userService.setMessage('User(s) deleted successfully!')
        window.location.reload();
        // this.router.navigateByUrl('/users');
        this.ngOnInit();
      });
    }
  }

  protected checker = (event: any) => {
    $('#checkAllUsers').click(function () {
      $('input:checkbox').prop('checked', event.target.checked);
    });

    this.checkArray = this.form.get('ids') as FormArray;
    if (event.target.checked == true) {
      for (const user of this.users) {
        this.checkArray.push(new FormControl(user.id.toString()));
      }
    } else {
      this.checkArray.clear();
    }
  };

  protected onCheckBoxChange(e: any) {
    this.checkArray = this.form.get('ids') as FormArray;
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: any) => {
        if (item.value === e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
