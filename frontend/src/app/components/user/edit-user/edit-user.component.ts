import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  id: any;
  form!: FormGroup;
  user!: User;

  email = 'a';
  firstName = 'b';
  lastName = 'c';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.route.params.subscribe((res) => {
      this.id = res['id'];
      this.userService.getUser(this.id).subscribe((data) => {
        this.user = data;
        this.email = data.email;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.form = this.fb.group({
          firstName: new FormControl(this.firstName),
          lastName: new FormControl(this.lastName),
          email: new FormControl(this.email),
        });
      });
    });
  }

  onSubmit() {
    this.user.email = this.form.value.email;
    this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.userService.updateUser(this.id, this.user).subscribe((res) => {
      this.userService.setMessage(res.message);
      this.router.navigateByUrl('/users');
    });
  }
}
