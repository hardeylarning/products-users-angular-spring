import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User2 } from 'src/app/model/user2';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  email = ''
  firstName = ''
  lastName = ''
  password = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
   let user = new User2(this.firstName, this.lastName, this.email, this.password, 'USER')
    this.userService.addUser(user).subscribe(data => {
      this.userService.setMessage(data.message)
      this.router.navigateByUrl('/users')
    })
  }

}
